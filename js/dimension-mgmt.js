// 维度管理模块

var _dimRows = [
  { code:'di3',      name:'订单状态',   cat:'指标体系', dataType:'manual',  desc:'' },
  { code:'device',   name:'指标分类维度表',   cat:'指标体系', dataType:'dynamic', desc:'指标分类维度数据' },
  { code:'test',     name:'客户',       cat:'指标体系', dataType:'manual',  desc:'' },
  { code:'org',      name:'组织架构',   cat:'指标体系', dataType:'dynamic', desc:'公司组织架构维度' },
  { code:'area',     name:'区域',       cat:'指标体系', dataType:'manual',  desc:'销售区域划分' },
  { code:'product',  name:'产品分类',   cat:'指标体系', dataType:'dynamic', desc:'产品目录分类' },
  { code:'supplier', name:'供应商',     cat:'指标体系', dataType:'manual',  desc:'供应商基本信息' },
  { code:'warehouse',name:'仓库',       cat:'指标体系', dataType:'dynamic', desc:'仓库编码与位置' },
  { code:'channel',  name:'销售渠道',   cat:'指标体系', dataType:'manual',  desc:'线上线下渠道' },
  { code:'dept',     name:'部门',       cat:'指标体系', dataType:'dynamic', desc:'部门维度数据' },
];

function _buildDimRows() {
  return _dimRows.map(function(r) {
    var typeLabel = r.dataType === 'manual' ? '手工录入' : '动态数据';
    var dataFn = r.dataType === 'manual'
      ? "openDimensionDataManual('" + r.name + "')"
      : "openDimensionDataDynamic('" + r.name + "')";
    return '<tr>' +
      '<td><input type="checkbox"></td>' +
      '<td>' + r.code + '</td>' +
      '<td><a class="action-link" onclick="' + dataFn + '">' + r.name + '</a></td>' +
      '<td><span style="font-weight:500">' + typeLabel + '</span></td>' +
      '<td>' + r.desc + '</td>' +
      '<td class="op-cell">' +
        '<i class="fa-regular fa-pen-to-square action-icon" title="编辑" onclick="openDimensionForm(\'edit\',{code:\'' + r.code + '\',name:\'' + r.name + '\',cat:\'' + r.cat + '\',dataType:\'' + r.dataType + '\'})"></i>' +
        '<i class="fa-solid fa-database action-icon" title="数据管理" onclick="' + dataFn + '"></i>' +
        '<i class="fa-regular fa-trash-can action-icon action-icon-danger" title="删除" onclick="confirmDelete(\'' + r.name + '\')"></i>' +
      '</td>' +
    '</tr>';
  }).join('');
}

// ============ 维度管理页面 ============
function renderDimensionMgmt(container, config) {
  container.innerHTML = `
    <div class="split-layout">
      <!-- 左侧分类树 -->
      <div class="split-left">
        <div class="split-left-header">
          <span><i class="fa-solid fa-bars" style="margin-right:6px"></i>维度管理分类</span>
          <i class="fa-solid fa-plus" style="color:var(--primary-color); cursor:pointer; font-size:13px"></i>
        </div>
        <div class="split-left-search">
          <i class="fa-solid fa-magnifying-glass"></i>
          <input type="text" placeholder="搜索">
        </div>
        <div class="category-tree" id="dimension-tree"></div>
      </div>
      <!-- 右侧内容 -->
      <div class="split-right">
        <div class="ind-tab-bar">
          <div class="ind-tab active"><i class="fa-regular fa-folder" style="color:#f90; margin-right:4px; font-size:12px"></i> 全部</div>
        </div>
        <div class="ind-toolbar">
          <button class="btn btn-primary btn-sm" onclick="openDimensionForm('new')">新建</button>
          <div style="flex:1"></div>
          <div class="select-box select-sm">请选择数据类型 <i class="fa-solid fa-chevron-down"></i></div>
          <div class="search-box search-sm">
            <i class="fa-solid fa-magnifying-glass"></i>
            <input type="text" placeholder="请输入编码或名称">
          </div>
          <button class="btn btn-primary btn-sm">查询</button>
          <button class="btn btn-sm">重置</button>
        </div>
        <div class="dim-icon-bar">
          <span class="dim-toggle-wrap"><input type="checkbox"><span class="dim-toggle-slider"></span></span>
          <i class="fa-solid fa-rotate" title="刷新"></i>
          <i class="fa-solid fa-text-height" title="调整"></i>
          <i class="fa-solid fa-gear" title="设置"></i>
          <i class="fa-solid fa-expand" title="全屏"></i>
        </div>
        <div class="ind-table-wrap">
          <table class="data-table">
            <thead>
              <tr>
                <th style="width:36px"><input type="checkbox"></th>
                <th>编码</th>
                <th>名称</th>
                <th>数据类型</th>
                <th>描述</th>
                <th>操作</th>
              </tr>
            </thead>
            <tbody>
              ${_buildDimRows()}
            </tbody>
          </table>
          <div class="pagination">
            <span class="page-info">总共 32 条数据</span>
            <div class="page-btn"><i class="fa-solid fa-chevron-left"></i></div>
            <div class="page-btn active">1</div>
            <div class="page-btn">2</div>
            <div class="page-btn">3</div>
            <div class="page-btn">4</div>
            <div class="page-btn"><i class="fa-solid fa-chevron-right"></i></div>
            <span class="page-info" style="margin-left:8px">10 条/页</span>
          </div>
        </div>
      </div>
    </div>`;
  buildCommonCatTree('dimension-tree');
}

// ============ 维度新建/编辑表单 ============
function openDimensionForm(mode, data) {
  const contentArea = document.getElementById('content-area');
  const isEdit = mode === 'edit';
  const d = data || { code: '', name: '', cat: '', dataType: 'dynamic' };
  const title = isEdit ? '编辑维度' : '新建维度';

  contentArea.innerHTML = `
    <div class="edit-page">
      <div class="edit-page-header">
        <span class="edit-page-title"><i class="fa-regular fa-clone" style="margin-right:6px; color:var(--text-tertiary)"></i>${title}</span>
        <div class="edit-page-actions">
          <button class="btn btn-sm" onclick="loadPage('dimension-mgmt')">返 回</button>
        </div>
      </div>
      <div class="edit-page-body" style="padding:24px 32px">
        <div class="dim-form">
          <div class="dim-form-row">
            <label class="dim-form-label required">编码：</label>
            <div class="dim-form-field"><input type="text" class="form-control" value="${d.code}" ${isEdit ? '' : 'placeholder="请输入编码"'}></div>
          </div>
          <div class="dim-form-row">
            <label class="dim-form-label required">名称：</label>
            <div class="dim-form-field"><input type="text" class="form-control" value="${d.name}" ${isEdit ? '' : 'placeholder="请输入名称"'}></div>
          </div>
          <div class="dim-form-row">
            <label class="dim-form-label required">所属分类：</label>
            <div class="dim-form-field"><input type="text" class="form-control" value="${d.cat || '指标体系'}" ${isEdit ? '' : 'placeholder="请选择分类"'}></div>
          </div>
          <div class="dim-form-row">
            <label class="dim-form-label">数据集：</label>
            <div class="dim-form-field">
              <label class="dim-radio"><input type="radio" name="dim-data-type" value="dynamic" ${d.dataType==='dynamic'?'checked':''} onchange="switchDimDataType('dynamic')"> 动态数据</label>
              <label class="dim-radio"><input type="radio" name="dim-data-type" value="manual" ${d.dataType!=='dynamic'?'checked':''} onchange="switchDimDataType('manual')"> 手工录入</label>
            </div>
          </div>
          <div class="dim-form-row" id="dim-dataset-selector-row">
            <label class="dim-form-label"></label>
            <div class="dim-form-field" id="dim-dataset-selector"></div>
          </div>
          <div class="dim-form-row" style="align-items:flex-start">
            <label class="dim-form-label">数据配置：</label>
            <div class="dim-form-field" id="dim-config-area"></div>
          </div>
          <div class="dim-form-row" style="align-items:flex-start">
            <label class="dim-form-label">描述：</label>
            <div class="dim-form-field" style="position:relative">
              <textarea class="form-control" rows="4" maxlength="200" placeholder="200个字符以内，允许输入中文、英文、数字和特殊字符" style="max-width:500px; resize:vertical"></textarea>
              <span style="position:absolute; bottom:8px; right:8px; font-size:12px; color:var(--text-tertiary)">0 / 200</span>
            </div>
          </div>
          <div class="dim-form-row">
            <label class="dim-form-label"></label>
            <div class="dim-form-field" style="display:flex; gap:8px; margin-top:12px">
              <button class="btn btn-primary btn-sm" onclick="loadPage('dimension-mgmt')">保存</button>
              <button class="btn btn-sm" onclick="loadPage('dimension-mgmt')">取 消</button>
            </div>
          </div>
        </div>
      </div>
    </div>`;

  switchDimDataType(d.dataType === 'dynamic' ? 'dynamic' : d.dataType || 'dynamic');
}

var _dimDsFields = [
  'device_id(设备id)', 'device_name(设施名称)', 'device_code(设备编号)',
  'cid(单位id)', 'aid(厂区id)', 'gid(车间id)', 'fid(工位id)', 'production_line_id(生产线id)'
];

function _buildDimFieldSelect(selectedVal) {
  var opts = '<option value="">请选择</option>';
  _dimDsFields.forEach(function(f) {
    opts += '<option value="' + f + '"' + (f === selectedVal ? ' selected' : '') + '>' + f + '</option>';
  });
  return '<select class="form-control form-select" style="max-width:340px;">' + opts + '</select>';
}

function _buildDimFieldInput(id) {
  return '<div style="position:relative;max-width:340px;display:inline-block;width:100%;" id="dim-field-input-wrap-' + id + '">' +
    '<div style="display:flex;align-items:center;border:1px solid #d9d9d9;border-radius:4px;height:34px;padding:0 8px;background:#fff;cursor:pointer;" onclick="toggleDimFieldDropdown(\'' + id + '\')">' +
      '<input type="text" id="dim-field-val-' + id + '" readonly style="flex:1;border:none;outline:none;font-size:13px;background:transparent;cursor:pointer;" placeholder="">' +
      '<i class="fa-regular fa-circle-xmark" style="color:#c9cdd4;font-size:14px;cursor:pointer;" onclick="event.stopPropagation();clearDimFieldInput(\'' + id + '\')"></i>' +
    '</div>' +
  '</div>';
}

function toggleDimFieldDropdown(id) {
  var existingDd = document.getElementById('dim-field-dd-' + id);
  if (existingDd) { existingDd.remove(); return; }

  document.querySelectorAll('[id^="dim-field-dd-"]').forEach(function(el) { el.remove(); });

  var wrap = document.getElementById('dim-field-input-wrap-' + id);
  if (!wrap) return;

  var dd = document.createElement('div');
  dd.id = 'dim-field-dd-' + id;
  dd.style.cssText = 'position:absolute;top:100%;left:0;right:0;z-index:300;background:#fff;border:1px solid #d9d9d9;border-radius:4px;box-shadow:0 4px 12px rgba(0,0,0,.12);margin-top:2px;max-height:260px;overflow-y:auto;';

  var html = '';
  _dimDsFields.forEach(function(f) {
    html += '<div style="padding:8px 14px;font-size:13px;cursor:pointer;white-space:nowrap;" ' +
      'onmouseover="this.style.background=\'#f0f5ff\'" onmouseout="this.style.background=\'transparent\'" ' +
      'onclick="selectDimFieldOption(\'' + id + '\',\'' + f + '\')">' + f + '</div>';
  });
  dd.innerHTML = html;
  wrap.appendChild(dd);

  setTimeout(function() {
    var handler = function(e) {
      if (!dd.contains(e.target) && !wrap.contains(e.target)) {
        dd.remove();
        document.removeEventListener('click', handler);
      }
    };
    document.addEventListener('click', handler);
  }, 0);
}

function selectDimFieldOption(id, val) {
  var inp = document.getElementById('dim-field-val-' + id);
  if (inp) inp.value = val;
  var dd = document.getElementById('dim-field-dd-' + id);
  if (dd) dd.remove();
}

function clearDimFieldInput(id) {
  var inp = document.getElementById('dim-field-val-' + id);
  if (inp) inp.value = '';
}

function switchDimDataType(type) {
  var selArea = document.getElementById('dim-dataset-selector');
  var cfgArea = document.getElementById('dim-config-area');
  if (!selArea || !cfgArea) return;

  if (type === 'dynamic') {
    selArea.innerHTML =
      '<div style="position:relative;max-width:500px;" id="dim-ds-tree-wrap">' +
        '<div style="display:flex;align-items:center;border:1px solid #d9d9d9;border-radius:4px;padding:0 10px;height:34px;background:#fff;cursor:pointer;" onclick="toggleDimDsTree()">' +
          '<input type="text" id="dim-ds-tree-input" placeholder="请选择数据集" readonly style="flex:1;border:none;outline:none;font-size:13px;color:var(--text-primary);cursor:pointer;background:transparent;" value="设备维度数据">' +
          '<i class="fa-solid fa-angle-down" style="color:#c9cdd4;font-size:13px;"></i>' +
        '</div>' +
      '</div>';

    cfgArea.innerHTML =
      '<table class="dim-config-table">' +
        '<thead><tr><th>属性</th><th>数据集字段</th></tr></thead>' +
        '<tbody>' +
          '<tr><td><span style="color:#e34d59;">*</span>维度编码</td><td>' + _buildDimFieldSelect('device_id(设备id)') + '</td></tr>' +
          '<tr><td><span style="color:#e34d59;">*</span>维度名称</td><td>' + _buildDimFieldSelect('device_name(设施名称)') + '</td></tr>' +
          '<tr><td>父类编码</td><td>' + _buildDimFieldInput('parent') + '</td></tr>' +
        '</tbody>' +
      '</table>' +
      '<a class="action-link" style="display:inline-flex;align-items:center;gap:4px;margin-top:8px;font-size:13px;color:var(--primary-color);cursor:pointer;">' +
        '<i class="fa-solid fa-circle-plus" style="font-size:12px;"></i> 新增一行</a>';
  } else {
    selArea.innerHTML =
      '<div style="max-width:500px;">' +
        '<select class="form-control form-select" disabled style="background:#f5f5f5;color:#999;cursor:not-allowed;">' +
          '<option></option>' +
        '</select>' +
      '</div>';

    cfgArea.innerHTML =
      '<table class="dim-config-table">' +
        '<thead><tr><th>属性</th><th>字段配置</th></tr></thead>' +
        '<tbody>' +
          '<tr><td>维度编码</td><td><input type="checkbox" checked></td></tr>' +
          '<tr><td>维度名称</td><td><input type="checkbox" checked></td></tr>' +
          '<tr><td>父类编码</td><td><input type="checkbox"></td></tr>' +
        '</tbody>' +
      '</table>' +
      '<a class="action-link" style="display:inline-block;margin-top:8px;font-size:13px;color:var(--primary-color);">添加配置</a>';
  }
}

function toggleDimDsTree() {
  var existing = document.getElementById('dim-ds-tree-dropdown');
  if (existing) { existing.remove(); return; }

  var wrap = document.getElementById('dim-ds-tree-wrap');
  if (!wrap) return;

  var dd = document.createElement('div');
  dd.id = 'dim-ds-tree-dropdown';
  dd.style.cssText = 'position:absolute;top:100%;left:0;right:0;z-index:300;background:#fff;border:1px solid #d9d9d9;border-radius:4px;box-shadow:0 4px 12px rgba(0,0,0,.12);margin-top:2px;max-height:280px;overflow-y:auto;';

  var treeData = [
    { name: '数据集', icon: 'fa-folder', color: '#f90', open: true, children: [
      { name: 'test', icon: 'fa-folder', color: '#f90', open: true, children: [
        { name: '数据脱敏测试', leaf: true },
        { name: 'copy生产订单计划完成率图', leaf: true },
        { name: '子查询不分组', leaf: true },
        { name: '工单选择控件', leaf: true },
        { name: '查询所有工单', leaf: true },
      ]},
      { name: '物流项目', icon: 'fa-folder', color: '#f90', open: false, children: [
        { name: '各机构快递统计', leaf: true },
      ]},
    ]},
  ];

  function buildTree(nodes, level) {
    var html = '';
    nodes.forEach(function(n) {
      var indent = (level * 20) + 12;
      if (n.leaf) {
        html += '<div style="padding:6px 12px 6px ' + indent + 'px;font-size:13px;cursor:pointer;white-space:nowrap;" onmouseover="this.style.background=\'#f0f5ff\'" onmouseout="this.style.background=\'transparent\'" onclick="selectDimDsTreeNode(\'' + n.name + '\')">' +
          '<span style="display:inline-block;width:16px;"></span>' + n.name + '</div>';
      } else {
        var arrow = n.open ? 'fa-caret-down' : 'fa-caret-right';
        html += '<div style="padding:6px 12px 6px ' + indent + 'px;font-size:13px;cursor:pointer;white-space:nowrap;color:#999;" onmouseover="this.style.background=\'#f0f5ff\'" onmouseout="this.style.background=\'transparent\'">' +
          '<i class="fa-solid ' + arrow + '" style="width:16px;font-size:11px;color:#c9cdd4;"></i>' +
          '<i class="fa-regular ' + (n.icon||'fa-folder') + '" style="color:' + (n.color||'#f90') + ';margin-right:6px;font-size:13px;"></i>' +
          n.name + '</div>';
        if (n.open && n.children) {
          html += buildTree(n.children, level + 1);
        }
      }
    });
    return html;
  }

  dd.innerHTML = buildTree(treeData, 0);
  wrap.appendChild(dd);

  setTimeout(function() {
    var handler = function(e) {
      if (!dd.contains(e.target) && !wrap.contains(e.target)) {
        dd.remove();
        document.removeEventListener('click', handler);
      }
    };
    document.addEventListener('click', handler);
  }, 0);
}

function selectDimDsTreeNode(name) {
  var wrap = document.getElementById('dim-ds-tree-wrap');
  if (wrap) {
    var inp = wrap.querySelector('input[type="text"]');
    if (inp) { inp.value = name; inp.placeholder = name; }
  }
  var dd = document.getElementById('dim-ds-tree-dropdown');
  if (dd) dd.remove();
}

// ============ 维度数据管理页面（动态数据） ============
function openDimensionDataDynamic(dimName) {
  const contentArea = document.getElementById('content-area');
  const name = dimName || '设备维度';

  const items = [
    { code: 1, name: '组装1线电箱', area: '1', cat: '生产设备' },
    { code: 2, name: '组装A线电箱', area: '1', cat: '生产设备' },
    { code: 3, name: 'U型架充线电箱', area: '1', cat: '生产设备' },
    { code: 4, name: 'U型流水线', area: '', cat: '生产设备' },
    { code: 5, name: '皮带线', area: '', cat: '生产设备' },
    { code: 6, name: '装配TV线', area: '', cat: '生产设备' },
    { code: 7, name: '自动装配线', area: '', cat: '生产设备' },
    { code: 8, name: '超声波塑焊机', area: '', cat: '生产设备' },
    { code: 9, name: '3D打印机', area: '', cat: '生产设备' },
    { code: 10, name: 'RCA纸带耐磨试验机', area: '', cat: '生产设备' },
  ];

  const rows = items.map(r => `
    <tr>
      <td>${r.code}</td>
      <td>${r.name}</td>
      <td>${r.area}</td>
      <td>${r.cat}</td>
    </tr>`).join('');

  contentArea.innerHTML = `
    <div class="edit-page">
      <div class="edit-page-header">
        <span class="edit-page-title"><i class="fa-regular fa-clone" style="margin-right:6px; color:var(--text-tertiary)"></i>${name}</span>
        <div class="edit-page-actions">
          <button class="btn btn-sm" onclick="loadPage('dimension-mgmt')">返 回</button>
        </div>
      </div>
      <div class="edit-page-body" style="padding:0">
        <div style="display:flex; align-items:center; justify-content:flex-end; gap:8px; padding:12px 16px; border-bottom:1px solid var(--border-color)">
          <div class="search-box search-sm" style="min-width:240px">
            <i class="fa-solid fa-magnifying-glass"></i>
            <input type="text" placeholder="请输入维度编码或维度名称">
          </div>
          <button class="btn btn-primary btn-sm">查询</button>
          <button class="btn btn-sm">重置</button>
        </div>
        <div class="ind-table-wrap" style="margin:0">
          <table class="data-table">
            <thead>
              <tr>
                <th>维度编码 <i class="fa-solid fa-sort" style="color:#c9cdd4; margin-left:4px; font-size:10px"></i></th>
                <th>维度名称 <i class="fa-solid fa-sort" style="color:#c9cdd4; margin-left:4px; font-size:10px"></i></th>
                <th>厂区 <i class="fa-solid fa-sort" style="color:#c9cdd4; margin-left:4px; font-size:10px"></i></th>
                <th>分类 <i class="fa-solid fa-sort" style="color:#c9cdd4; margin-left:4px; font-size:10px"></i></th>
              </tr>
            </thead>
            <tbody>${rows}</tbody>
          </table>
          <div class="pagination" style="padding:12px 16px">
            <span class="page-info">总共 196 条数据</span>
            <span class="page-nav">
              <span class="page-btn disabled">&lt;</span>
              <span class="page-btn active">1</span>
              <span class="page-btn">2</span>
              <span class="page-btn">3</span>
              <span class="page-btn">4</span>
              <span class="page-btn">5</span>
              <span class="page-btn disabled">···</span>
              <span class="page-btn">20</span>
              <span class="page-btn">&gt;</span>
            </span>
            <span class="page-size">10 条/页</span>
            <span style="color:var(--text-secondary); font-size:13px; margin-left:8px">跳至</span>
            <input type="text" class="form-control" style="width:48px; height:28px; text-align:center; padding:0; font-size:13px; margin:0 4px">
            <span style="color:var(--text-secondary); font-size:13px">页</span>
          </div>
        </div>
      </div>
    </div>`;
}

// ============ 维度数据管理页面（手工录入） ============
function openDimensionDataManual(dimName) {
  const contentArea = document.getElementById('content-area');
  const name = dimName || '订单状态';

  const items = [
    { code: 1, name: '创建' },
    { code: 2, name: '生效' },
    { code: 3, name: '完成' },
    { code: 4, name: '关闭' },
    { code: 5, name: '取消' },
  ];

  const rows = items.map(r => `
    <tr>
      <td><input type="checkbox"></td>
      <td>${r.code}</td>
      <td>${r.name}</td>
      <td class="op-cell">
        <i class="fa-regular fa-pen-to-square action-icon" title="编辑" onclick="openDimManualFormModal('edit','${r.code}','${r.name}')"></i>
        <i class="fa-regular fa-trash-can action-icon action-icon-danger" title="删除" onclick="confirmDelete('${r.name}')"></i>
      </td>
    </tr>`).join('');

  contentArea.innerHTML = `
    <div class="edit-page">
      <div class="edit-page-header">
        <span class="edit-page-title"><i class="fa-regular fa-clone" style="margin-right:6px; color:var(--text-tertiary)"></i>${name}</span>
        <div class="edit-page-actions">
          <button class="btn btn-sm" onclick="loadPage('dimension-mgmt')">返 回</button>
        </div>
      </div>
      <div class="edit-page-body" style="padding:0">
        <div style="display:flex; align-items:center; gap:8px; padding:12px 16px; border-bottom:1px solid var(--border-color)">
          <button class="btn btn-sm" onclick="openDimManualFormModal('add')">新增</button>
          <button class="btn btn-sm" onclick="openDimManualImportModal()"><i class="fa-solid fa-download"></i> 导入</button>
          <button class="btn btn-sm"><i class="fa-solid fa-upload"></i> 导出</button>
          <button class="btn btn-sm" onclick="confirmBatchDelete(2)">删除</button>
          <div style="flex:1"></div>
          <div class="search-box search-sm" style="min-width:240px">
            <i class="fa-solid fa-magnifying-glass"></i>
            <input type="text" placeholder="请输入维度编码或维度名称">
          </div>
          <button class="btn btn-primary btn-sm">查询</button>
          <button class="btn btn-sm">重置</button>
        </div>
        <div class="ind-table-wrap" style="margin:0">
          <table class="data-table">
            <thead>
              <tr>
                <th style="width:36px"><input type="checkbox"></th>
                <th>维度编码 <i class="fa-solid fa-sort" style="color:#c9cdd4; margin-left:4px; font-size:10px"></i></th>
                <th>维度名称 <i class="fa-solid fa-sort" style="color:#c9cdd4; margin-left:4px; font-size:10px"></i></th>
                <th>操作</th>
              </tr>
            </thead>
            <tbody>${rows}</tbody>
          </table>
          <div class="pagination" style="padding:12px 16px">
            <span class="page-info">总共 ${items.length} 条数据</span>
            <span class="page-nav">
              <span class="page-btn disabled">&lt;</span>
              <span class="page-btn active">1</span>
              <span class="page-btn disabled">&gt;</span>
            </span>
            <span class="page-size">10 条/页</span>
          </div>
        </div>
      </div>
    </div>`;
}

// ============ 手工录入 - 新建/编辑弹窗 ============
function openDimManualFormModal(mode, code, name) {
  var isEdit = mode === 'edit';
  var title = isEdit ? '编辑' : '新建';

  var overlay = document.createElement('div');
  overlay.id = 'dim-manual-form-overlay';
  overlay.className = 'modal-overlay';

  var modal = document.createElement('div');
  modal.className = 'modal';
  modal.style.cssText = 'width:480px;display:flex;flex-direction:column;overflow:hidden;';
  modal.innerHTML =
    '<div class="modal-header">' +
      '<span class="modal-title">' + title + '</span>' +
      '<span class="modal-close" onclick="closeDimManualFormModal()">&times;</span>' +
    '</div>' +
    '<div style="padding:24px 28px;">' +
      '<div style="margin-bottom:20px;">' +
        '<div style="font-size:13px;color:#333;margin-bottom:8px;"><span style="color:#f53f3f;margin-right:2px;">*</span>维度编码</div>' +
        '<input type="text" class="form-control" placeholder="请输入维度编码,100个字符以内" maxlength="100" value="' + (isEdit ? (code || '') : '') + '" style="width:100%;">' +
      '</div>' +
      '<div style="margin-bottom:20px;">' +
        '<div style="font-size:13px;color:#333;margin-bottom:8px;"><span style="color:#f53f3f;margin-right:2px;">*</span>维度名称</div>' +
        '<input type="text" class="form-control" placeholder="请输入维度名称,100个字符以内" maxlength="100" value="' + (isEdit ? (name || '') : '') + '" style="width:100%;">' +
      '</div>' +
    '</div>' +
    '<div style="display:flex;justify-content:flex-end;gap:8px;padding:14px 28px;border-top:1px solid #f0f0f0;">' +
      '<button class="btn btn-sm" onclick="closeDimManualFormModal()">取 消</button>' +
      '<button class="btn btn-primary btn-sm" onclick="closeDimManualFormModal()">确 定</button>' +
    '</div>';

  overlay.appendChild(modal);
  document.body.appendChild(overlay);
}

function closeDimManualFormModal() {
  var el = document.getElementById('dim-manual-form-overlay');
  if (el) el.remove();
}

// ============ 手工录入 - 导入弹窗 ============
function openDimManualImportModal() {
  var overlay = document.createElement('div');
  overlay.id = 'dim-manual-import-overlay';
  overlay.className = 'modal-overlay';

  var modal = document.createElement('div');
  modal.className = 'modal';
  modal.style.cssText = 'width:620px;display:flex;flex-direction:column;overflow:hidden;';
  modal.innerHTML =
    '<div class="modal-header">' +
      '<span class="modal-title">导入</span>' +
      '<span class="modal-close" onclick="closeDimManualImportModal()">&times;</span>' +
    '</div>' +
    '<div style="padding:24px 28px;">' +
      '<div style="margin-bottom:20px;">' +
        '<div style="font-size:13px;color:#333;margin-bottom:4px;">下载导入模板 <span style="color:#999;font-size:12px;">根据提示信息完善表格内容</span></div>' +
        '<div style="border:1px solid #d9d9d9;border-radius:4px;padding:10px 0;text-align:center;cursor:pointer;margin-top:8px;" onmouseover="this.style.borderColor=\'var(--primary-color)\'" onmouseout="this.style.borderColor=\'#d9d9d9\'">' +
          '<i class="fa-solid fa-download" style="margin-right:6px;color:#999;"></i>' +
          '<span style="font-size:13px;color:#333;">下载表格模板</span>' +
        '</div>' +
      '</div>' +
      '<div>' +
        '<div style="display:flex;align-items:center;justify-content:space-between;margin-bottom:8px;">' +
          '<span style="font-size:13px;color:#333;">上传完善后的表格</span>' +
          '<span style="font-size:12px;color:#999;cursor:pointer;"><i class="fa-regular fa-clock" style="margin-right:4px;"></i>导入历史</span>' +
        '</div>' +
        '<div style="border:1px dashed #d9d9d9;border-radius:4px;padding:40px 0;text-align:center;background:#fafafa;cursor:pointer;" onmouseover="this.style.borderColor=\'var(--primary-color)\'" onmouseout="this.style.borderColor=\'#d9d9d9\'">' +
          '<i class="fa-regular fa-envelope-open" style="font-size:36px;color:var(--primary-color);display:block;margin-bottom:10px;"></i>' +
          '<span style="font-size:13px;color:#666;">将文件拖到此处或点击上传</span>' +
        '</div>' +
      '</div>' +
    '</div>' +
    '<div style="display:flex;justify-content:flex-end;gap:8px;padding:14px 28px;border-top:1px solid #f0f0f0;">' +
      '<button class="btn btn-sm" onclick="closeDimManualImportModal()">取 消</button>' +
      '<button class="btn btn-primary btn-sm" onclick="closeDimManualImportModal()">确 定</button>' +
    '</div>';

  overlay.appendChild(modal);
  document.body.appendChild(overlay);
}

function closeDimManualImportModal() {
  var el = document.getElementById('dim-manual-import-overlay');
  if (el) el.remove();
}
