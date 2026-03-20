// 数据集模块
function renderDataset(container, config) {
  const dsRows = [
    { name:'生产订单表', type:'SQL', status:'已关联', author:'ShangsV...', time:'2025-12-17 11:03:05', exec:'0.014秒' },
    { name:'数据脱敏测试', type:'SQL', status:'已关联', author:'ShangsV...', time:'2025-07-22 11:08:30', exec:'0.008秒' },
    { name:'测试', type:'SQL', status:'', author:'Geh_aot...', time:'2024-07-04 14:52:14', exec:'0.013秒' },
    { name:'设备维度数据', type:'SQL', status:'', author:'Haom_a...', time:'2024-05-23 17:59:08', exec:'0.005秒' },
    { name:'copy生产订单计划完成率图', type:'SQL', status:'', author:'Haom_a...', time:'2024-05-23 15:40:50', exec:'' },
    { name:'设备产出', type:'SQL', status:'', author:'Haom_a...', time:'2023-12-12 09:44:14', exec:'0.046秒' },
    { name:'设备能耗', type:'SQL', status:'', author:'Haom_a...', time:'2023-12-12 09:43:00', exec:'' },
    { name:'子查询不分组', type:'SQL', status:'', author:'Haom_a...', time:'2023-11-17 16:04:10', exec:'' },
    { name:'工单选择控件', type:'SQL', status:'', author:'Haom_a...', time:'2023-11-17 14:20:19', exec:'' },
    { name:'查询所有工单', type:'SQL', status:'', author:'Haom_a...', time:'2023-11-17 14:16:26', exec:'' },
  ];

  const tbody = dsRows.map(r => `
    <tr>
      <td><input type="checkbox"></td>
      <td><a class="action-link">${r.name}</a></td>
      <td>${r.type}</td>
      <td>${r.status ? '<span class="badge badge-blue">'+r.status+'</span>' : ''}</td>
      <td>${r.author}</td>
      <td>${r.time}</td>
      <td>${r.exec}</td>
      <td class="op-cell">
        <i class="fa-regular fa-pen-to-square action-icon" title="编辑" onclick="openDatasetForm()"></i>
        <i class="fa-regular fa-trash-can action-icon action-icon-danger" title="删除" onclick="confirmDelete('${r.name}')"></i>
      </td>
    </tr>`).join('');

  container.innerHTML = `
    <div class="split-layout">
      <div class="split-left">
        <div class="split-left-header">
          <span><i class="fa-solid fa-bars" style="margin-right:6px"></i>数据集目录</span>
          <i class="fa-solid fa-plus" style="color:var(--primary-color); cursor:pointer; font-size:13px"></i>
        </div>
        <div class="split-left-search">
          <i class="fa-solid fa-magnifying-glass"></i>
          <input type="text" placeholder="请输入...">
        </div>
        <div class="category-tree">
          <div class="cat-node selected" onclick="selectCatNode(this)">
            <i class="fa-regular fa-folder" style="color:#f90"></i> 全部
          </div>
          <div class="cat-node" onclick="selectCatNode(this)">
            <i class="fa-regular fa-folder" style="color:#f90"></i> test
          </div>
          <div class="cat-node" onclick="selectCatNode(this)">
            <i class="fa-regular fa-folder" style="color:#f90"></i> 物流项目
          </div>
          <div class="cat-node" onclick="selectCatNode(this)">
            <span class="cat-toggle"><i class="fa-solid fa-caret-right"></i></span>
            <i class="fa-regular fa-folder" style="color:#f90"></i> 销售订单
          </div>
          <div class="cat-node" onclick="selectCatNode(this)">
            <i class="fa-regular fa-folder" style="color:#f90"></i> 维度数据集
          </div>
          <div class="cat-node" onclick="selectCatNode(this)">
            <i class="fa-regular fa-folder" style="color:#f90"></i> 阳标体系
          </div>
        </div>
      </div>
      <div class="split-right">
        <div class="ind-toolbar">
          <button class="btn btn-primary btn-sm" onclick="openDatasetForm()">新建</button>
          <button class="btn btn-sm">数据性映射</button>
          <button class="btn btn-sm" style="color:#f53f3f; border-color:#f53f3f" onclick="confirmBatchDelete(2)">删除</button>
          <div style="flex:1"></div>
          <div class="select-box select-sm">请选择数据集类型 <i class="fa-solid fa-chevron-down"></i></div>
          <div class="search-box search-sm">
            <i class="fa-solid fa-magnifying-glass"></i>
            <input type="text" placeholder="请输入">
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
                <th>数据集名称</th>
                <th>数据集类型</th>
                <th>关联状态</th>
                <th>操作者</th>
                <th>修改时间</th>
                <th>执行时长 <i class="fa-solid fa-sort" style="color:#c9cdd4; margin-left:2px; font-size:11px"></i></th>
                <th style="width:70px">操作</th>
              </tr>
            </thead>
            <tbody>${tbody}</tbody>
          </table>
          <div class="pagination" style="padding:12px 16px">
            <span class="page-info">总共 46 条数据</span>
            <span class="page-nav">
              <span class="page-btn disabled">&lt;</span>
              <span class="page-btn active">1</span>
              <span class="page-btn">2</span>
              <span class="page-btn">3</span>
              <span class="page-btn">4</span>
              <span class="page-btn">5</span>
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

// ============ 数据集新建/编辑页面 ============
function openDatasetForm() {
  const tables = [
    'dfs_metrics_device_oee','dfs_metrics_line_daily','dfs_metrics_product_or...',
    'dfs_metrics_quality_line...','dfs_metrics_quality_line...',
    'dfs_metrics_team_daily','dfs_metrics_valuation_cal','dfs_metrics_work_order',
    'dfs_metrics_work_order...','dfs_metrics_work_order...',
    'v_ams_product_order','v_ams_product_order_m...','v_ams_purchase_receipt',
    'v_ams_purchase_receipt...','v_ams_sale_order','v_ams_sale_order_mater...',
    'v_dfs_attendance','v_dfs_attendance_record','v_dfs_capacity',
    'v_dfs_customer','v_dfs_device','v_dfs_maintain_record',
    'v_dfs_material','v_dfs_order_procedure_...'
  ];
  const listItems = tables.map((t,i) => `
    <div class="fact-table-item" onclick="selectFactTableItem(this,'${t}')">
      <i class="fa-solid fa-caret-right" style="color:#c9cdd4; margin-right:4px; font-size:10px"></i>
      <i class="fa-solid fa-table" style="color:var(--text-tertiary); margin-right:4px; font-size:11px"></i>${t}
    </div>`).join('');

  const contentArea = document.getElementById('content-area');
  contentArea.innerHTML = `
    <div style="display:flex; height:100%">
      <div class="fact-edit-left">
        <div class="fact-edit-left-header">
          <i class="fa-solid fa-database" style="color:#f90; margin-right:6px"></i>
          <span style="font-weight:600">dfs_metrics</span>
          <span style="margin-left:auto; color:var(--text-tertiary); cursor:pointer; position:relative;" onclick="toggleDbTreePanel(this)"><i class="fa-solid fa-ellipsis-vertical"></i></span>
        </div>
        <div class="split-left-search">
          <i class="fa-solid fa-magnifying-glass"></i>
          <input type="text" placeholder="请输入关键字">
        </div>
        <div class="fact-table-list">${listItems}</div>
      </div>
      <div class="fact-edit-right">
        <div class="fact-edit-right-header">
          <span style="font-size:15px; font-weight:500">到货趋势分析 <i class="fa-regular fa-pen-to-square" style="color:var(--text-tertiary); margin-left:6px; cursor:pointer; font-size:13px"></i></span>
          <div style="display:flex; gap:8px">
            <button class="btn btn-sm" onclick="loadPage('dataset')">返 回</button>
            <button class="btn btn-primary btn-sm" onclick="loadPage('dataset')">保存</button>
          </div>
        </div>
        <div class="ds-editor-area" style="flex-direction:column;">
          <div style="flex:1;display:flex;flex-direction:column;">
            <div class="ds-sql-editor" style="flex:1;display:flex;flex-direction:column;">
              <div class="ds-sql-header"><i class="fa-solid fa-circle-xmark" style="position:absolute; right:10px; top:10px; color:#666; cursor:pointer; font-size:14px"></i></div>
              <div class="ds-sql-body" style="flex:1;overflow:auto;"><pre class="ds-sql-code"><span class="ds-ln"> 1</span><span class="ds-kw">SELECT</span>
<span class="ds-ln"> 2</span>    user_type,
<span class="ds-ln"> 3</span>    user_id,
<span class="ds-ln"> 4</span>    user_name,
<span class="ds-ln"> 5</span>    create_time,
<span class="ds-ln"> 6</span>    <span class="ds-hl">DATE_FORMAT</span>(<span class="ds-hl">FROM_UNIXTIME</span>(last_login_time / <span class="ds-str">1000</span>), <span class="ds-str">'%Y-%m-%d'</span>) <span class="ds-kw">AS</span> last_login
<span class="ds-ln"> 7</span><span class="ds-kw">FROM</span>
<span class="ds-ln"> 8</span>    user <span class="ds-kw">WHERE</span> last_login_time != <span class="ds-str">''</span><span class="ds-cursor"></span></pre></div>
            </div>
            <div style="display:flex; justify-content:center; gap:10px; padding:12px 0">
              <button class="btn btn-primary btn-sm" style="min-width:80px">执行预览</button>
              <button class="btn btn-sm" style="min-width:80px">美 化</button>
            </div>
          </div>
        </div>
        <div class="fact-edit-tabs" style="padding:0 20px">
          <div class="fact-edit-tab active" onclick="switchDsTab(this,'preview')">预览</div>
          <div class="fact-edit-tab" onclick="switchDsTab(this,'fields')">字段属性</div>
        </div>
        <div id="ds-tab-content" style="flex:1; overflow:auto"></div>
      </div>
    </div>`;
  renderDsPreviewTab();
}

function switchDsTab(el, tab) {
  el.parentElement.querySelectorAll('.fact-edit-tab').forEach(t => t.classList.remove('active'));
  el.classList.add('active');
  if (tab === 'preview') renderDsPreviewTab();
  else if (tab === 'fields') renderDsFieldsTab();
}

function renderDsPreviewTab() {
  const data = [
    [1,1,1,'0%'],[6,9,9,'0%'],[7,7,7,'0%'],[8,10,10,'0%'],
    [9,15,15,'0%'],[10,32,32,'0%']
  ];
  const rows = data.map(r => '<tr>' + r.map(c => `<td>${c}</td>`).join('') + '</tr>').join('');
  document.getElementById('ds-tab-content').innerHTML = `
    <div style="padding:12px 20px">
      <div style="font-size:13px; color:var(--text-secondary); margin-bottom:10px">
        <i class="fa-solid fa-table" style="margin-right:4px"></i>
        <strong>预览</strong> 当前预览8条数据，共计8条，执行耗时0.006秒
      </div>
      <table class="data-table" style="font-size:13px">
        <thead><tr><th>m</th><th>到货批次数量</th><th>晚到货批次量</th><th>到货及时率</th></tr></thead>
        <tbody>${rows}</tbody>
      </table>
    </div>`;
}

function renderDsFieldsTab() {
  var fields = [
    { name:'m', alias:'m', type:'BIGINT', prop:'统计时间', extra:'yyyyMMdd' },
    { name:'到货批次数量', alias:'到货批次数量', type:'BIGINT', prop:'度量', extra:'' },
    { name:'晚到货批次量', alias:'晚到货批次量', type:'DECIMAL', prop:'维度', extra:'订单状态' },
    { name:'到货及时率', alias:'到货及时率', type:'VARCHAR', prop:'属性', extra:'华润业务分类' },
    { name:'create_time', alias:'create_time', type:'DATETIME', prop:'时间', extra:'yyyyMMdd' },
  ];

  var propOptions = ['度量','维度','统计时间','时间','属性'];
  var timeFormats = ['yyyy','yyyyMM','yyyyMMdd','yyyyMMdd HH','yyyyMMdd HH:mm','yyyyMMdd HH:mm:ss','yyyy-MM','yyyy-MM-dd'];

  var rows = fields.map(function(f, idx) {
    var optHtml = propOptions.map(function(o) {
      return '<option' + (o === f.prop ? ' selected' : '') + '>' + o + '</option>';
    }).join('');

    var linkedHtml = _buildDsFieldLinked(f.prop, f.extra, idx);

    return '<tr>' +
      '<td><a class="action-link">' + f.name + '</a></td>' +
      '<td><input class="form-control" value="' + f.alias + '" style="font-size:12px"></td>' +
      '<td>' + f.type + '</td>' +
      '<td style="min-width:280px;">' +
        '<div style="display:flex;align-items:center;gap:6px;flex-wrap:nowrap;">' +
          '<select class="form-control form-select" style="font-size:12px;width:90px;flex-shrink:0;" onchange="onDsFieldPropChange(this,' + idx + ')">' + optHtml + '</select>' +
          '<span id="ds-field-linked-' + idx + '" style="flex:1;min-width:0;">' + linkedHtml + '</span>' +
        '</div>' +
      '</td>' +
    '</tr>';
  }).join('');

  document.getElementById('ds-tab-content').innerHTML =
    '<div style="padding:12px 20px; overflow-x:auto">' +
      '<div style="font-size:14px;font-weight:600;color:#333;margin-bottom:10px;">字段属性</div>' +
      '<table class="data-table" style="font-size:13px; min-width:600px">' +
        '<thead><tr><th>字段名</th><th>别名</th><th>数据类型</th><th>字段属性</th></tr></thead>' +
        '<tbody>' + rows + '</tbody>' +
      '</table>' +
    '</div>';
}

function _buildDsFieldLinked(prop, value, idx) {
  var timeFormats = ['yyyy','yyyyMM','yyyyMMdd','yyyyMMdd HH','yyyyMMdd HH:mm','yyyyMMdd HH:mm:ss','yyyy-MM','yyyy-MM-dd'];

  if (prop === '度量') {
    return '';
  }
  if (prop === '维度' || prop === '属性') {
    var val = value || '';
    return '<div style="position:relative;display:inline-flex;align-items:center;min-width:140px;max-width:200px;border:1px solid #d9d9d9;border-radius:4px;padding:2px 6px;height:28px;background:#fff;cursor:pointer;" onclick="toggleDsFieldDimTree(this,' + idx + ')">' +
      '<span style="flex:1;font-size:12px;color:' + (val ? '#333' : '#bbb') + ';overflow:hidden;text-overflow:ellipsis;white-space:nowrap;">' + (val || '请选择') + '</span>' +
      (val ? '<i class="fa-solid fa-circle-xmark" style="color:#bfbfbf;font-size:12px;flex-shrink:0;margin-left:4px;" onclick="event.stopPropagation();clearDsFieldDimValue(this,' + idx + ')"></i>' : '') +
    '</div>';
  }
  if (prop === '统计时间' || prop === '时间') {
    var curVal = value || 'yyyyMMdd';
    var fmtOpts = timeFormats.map(function(fmt) {
      return '<option' + (fmt === curVal ? ' selected' : '') + '>' + fmt + '</option>';
    }).join('');
    return '<select class="form-control form-select" style="font-size:12px;width:160px;">' + fmtOpts + '</select>';
  }
  return '';
}

function onDsFieldPropChange(sel, idx) {
  var prop = sel.value;
  var span = document.getElementById('ds-field-linked-' + idx);
  if (span) span.innerHTML = _buildDsFieldLinked(prop, '', idx);
}

function toggleDsFieldDimTree(trigger, idx) {
  var existingId = 'ds-field-dim-dropdown-' + idx;
  var existing = document.getElementById(existingId);
  if (existing) { existing.remove(); return; }

  document.querySelectorAll('[id^="ds-field-dim-dropdown-"]').forEach(function(el){ el.remove(); });

  var dimTree =
    '<div style="padding:3px 12px 3px 12px;display:flex;align-items:center;gap:5px;font-size:13px;color:#999;cursor:default;">' +
      '<i class="fa-solid fa-caret-down" style="font-size:10px;color:#999;width:10px;"></i>' +
      '<span>君兰维度</span>' +
    '</div>' +
    '<div style="padding:3px 12px 3px 32px;font-size:13px;color:#333;cursor:pointer;" onmouseover="this.style.background=\'#f2f3f5\'" onmouseout="this.style.background=\'\'" onclick="event.stopPropagation();selectDsFieldDimNode(this,\'设备维度\',' + idx + ')">' +
      '<span style="font-weight:500;">设备维度</span>' +
    '</div>' +
    '<div style="padding:3px 12px 3px 12px;display:flex;align-items:center;gap:5px;font-size:13px;color:#999;cursor:default;">' +
      '<i class="fa-solid fa-caret-down" style="font-size:10px;color:#999;width:10px;"></i>' +
      '<span>华润</span>' +
    '</div>' +
    '<div style="padding:3px 12px 3px 24px;display:flex;align-items:center;gap:5px;font-size:13px;color:#999;cursor:default;">' +
      '<i class="fa-solid fa-caret-down" style="font-size:10px;color:#999;width:10px;"></i>' +
      '<span style="font-weight:500;color:#333;">指标体系</span>' +
    '</div>' +
    '<div style="padding:3px 12px 3px 48px;font-size:13px;color:#666;cursor:pointer;" onmouseover="this.style.background=\'#f2f3f5\'" onmouseout="this.style.background=\'\'" onclick="event.stopPropagation();selectDsFieldDimNode(this,\'人员分类\',' + idx + ')">人员分类</div>' +
    '<div style="padding:3px 12px 3px 48px;font-size:13px;color:#666;cursor:pointer;" onmouseover="this.style.background=\'#f2f3f5\'" onmouseout="this.style.background=\'\'" onclick="event.stopPropagation();selectDsFieldDimNode(this,\'华润业务分类\',' + idx + ')">华润业务分类</div>' +
    '<div style="padding:3px 12px 3px 48px;font-size:13px;color:#666;cursor:pointer;" onmouseover="this.style.background=\'#f2f3f5\'" onmouseout="this.style.background=\'\'" onclick="event.stopPropagation();selectDsFieldDimNode(this,\'订单状态\',' + idx + ')">订单状态</div>' +
    '<div style="padding:3px 12px 3px 12px;display:flex;align-items:center;gap:5px;font-size:13px;color:#999;cursor:default;">' +
      '<i class="fa-solid fa-caret-down" style="font-size:10px;color:#999;width:10px;"></i>' +
      '<span>test</span>' +
    '</div>' +
    '<div style="padding:3px 12px 3px 32px;font-size:13px;color:#333;cursor:pointer;font-weight:500;" onmouseover="this.style.background=\'#f2f3f5\'" onmouseout="this.style.background=\'\'" onclick="event.stopPropagation();selectDsFieldDimNode(this,\'客户\',' + idx + ')">客户</div>';

  var dd = document.createElement('div');
  dd.id = existingId;
  dd.style.cssText = 'position:absolute;top:100%;left:0;z-index:600;background:#fff;border:1px solid #e8e8e8;border-radius:6px;box-shadow:0 4px 16px rgba(0,0,0,.15);max-height:280px;overflow-y:auto;min-width:200px;padding:6px 0;margin-top:2px;';
  dd.innerHTML = dimTree;

  trigger.style.position = 'relative';
  trigger.appendChild(dd);

  setTimeout(function() {
    var handler = function(e) {
      if (!dd.contains(e.target) && !trigger.contains(e.target)) {
        dd.remove();
        document.removeEventListener('click', handler);
      }
    };
    document.addEventListener('click', handler);
  }, 0);
}

function selectDsFieldDimNode(el, name, idx) {
  var dd = document.getElementById('ds-field-dim-dropdown-' + idx);
  if (dd) dd.remove();
  var span = document.getElementById('ds-field-linked-' + idx);
  if (!span) return;
  var propSel = span.parentElement.querySelector('select');
  var prop = propSel ? propSel.value : '维度';
  span.innerHTML = _buildDsFieldLinked(prop, name, idx);
}

function clearDsFieldDimValue(icon, idx) {
  var span = document.getElementById('ds-field-linked-' + idx);
  if (!span) return;
  var propSel = span.parentElement.querySelector('select');
  var prop = propSel ? propSel.value : '维度';
  span.innerHTML = _buildDsFieldLinked(prop, '', idx);
}

// ============ 数据库目录树面板 ============
function toggleDbTreePanel(trigger) {
  var existing = document.getElementById('db-tree-panel');
  if (existing) { _removeDbTreePanel(); return; }

  var nt = function(indent, icon, iconColor, label, hasChildren, isOpen, isSelected) {
    var pad = indent * 20;
    var arrow = hasChildren
      ? '<i class="fa-solid fa-caret-' + (isOpen ? 'down' : 'right') + '" style="font-size:10px;color:#999;width:12px;flex-shrink:0;cursor:pointer;"></i>'
      : '<span style="width:12px;flex-shrink:0;"></span>';
    var selStyle = isSelected ? 'background:#e6f7ff;font-weight:500;' : '';
    var iconHtml = '<i class="fa-solid ' + icon + '" style="color:' + iconColor + ';font-size:13px;flex-shrink:0;"></i>';
    var clickAttr = (!hasChildren) ? ' onclick="event.stopPropagation();selectDbTreeTable(this,\'' + label.replace(/'/g,"\\'") + '\')"' : '';
    return '<div style="padding:3px 8px 3px ' + (8 + pad) + 'px;display:flex;align-items:center;gap:5px;font-size:13px;color:#333;cursor:pointer;' + selStyle + '"' + clickAttr + '>' + arrow + iconHtml + '<span>' + label + '</span></div>';
  };

  var treeHtml =
    nt(0,'fa-folder','#999','我的企业/机构',true,true,false) +
      nt(1,'fa-folder','#999','公共',true,true,false) +
        nt(2,'fa-server','#4080ff','阳江_ClickHouse_测试环境',true,true,false) +
          nt(3,'fa-folder','#f5a623','default',true,true,false) +
            nt(4,'fa-database','#4080ff','default',false,false,true) +
            nt(4,'fa-database','#8c8c8c','system',false,false,false) +
            nt(4,'fa-database','#8c8c8c','information_schema',false,false,false) +
        nt(2,'fa-server','#4080ff','深圳_MySQL_生产环境',true,true,false) +
          nt(3,'fa-folder','#f5a623','crdata',true,true,false) +
            nt(4,'fa-database','#4080ff','hr_db',false,false,false) +
            nt(4,'fa-database','#8c8c8c','finance_db',false,false,false) +
            nt(4,'fa-database','#8c8c8c','sales_db',false,false,false) +
            nt(4,'fa-database','#8c8c8c','logistics_db',false,false,false) +
          nt(3,'fa-folder','#f5a623','analysis',true,false,false) +
            nt(4,'fa-database','#8c8c8c','dw_ods',false,false,false) +
            nt(4,'fa-database','#8c8c8c','dw_dwd',false,false,false) +
            nt(4,'fa-database','#8c8c8c','dw_ads',false,false,false) +
        nt(2,'fa-server','#8c8c8c','华润_Oracle_核心库',true,false,false) +
          nt(3,'fa-folder','#f5a623','ORCL',true,false,false) +
            nt(4,'fa-database','#8c8c8c','ERP_PROD',false,false,false) +
            nt(4,'fa-database','#8c8c8c','HR_PROD',false,false,false) +
            nt(4,'fa-database','#8c8c8c','FIN_PROD',false,false,false) +
      nt(1,'fa-folder','#999','私有',true,true,false) +
        nt(2,'fa-server','#4080ff','本地_PostgreSQL_开发环境',true,true,false) +
          nt(3,'fa-folder','#f5a623','public',true,true,false) +
            nt(4,'fa-database','#4080ff','indicator_dev',false,false,false) +
            nt(4,'fa-database','#8c8c8c','dim_dev',false,false,false) +
            nt(4,'fa-database','#8c8c8c','fact_dev',false,false,false) +
            nt(4,'fa-database','#8c8c8c','staging_dev',false,false,false) +
        nt(2,'fa-server','#8c8c8c','测试_Doris_数据湖',true,false,false) +
          nt(3,'fa-folder','#f5a623','lake',true,false,false) +
            nt(4,'fa-database','#8c8c8c','ods_lake',false,false,false) +
            nt(4,'fa-database','#8c8c8c','dwd_lake',false,false,false) +
            nt(4,'fa-database','#8c8c8c','ads_lake',false,false,false);

  var panel = document.createElement('div');
  panel.id = 'db-tree-panel';
  panel.style.cssText = 'position:absolute;top:36px;left:0;min-width:320px;background:#fff;border:1px solid #e8e8e8;border-radius:6px;box-shadow:0 4px 16px rgba(0,0,0,.15);z-index:500;display:flex;flex-direction:column;max-height:460px;';

  panel.innerHTML =
    '<div style="padding:8px 12px;border-bottom:1px solid #f0f0f0;">' +
      '<div style="display:flex;align-items:center;gap:4px;border:1px solid #d9d9d9;border-radius:4px;padding:0 8px;height:30px;">' +
        '<i class="fa-solid fa-magnifying-glass" style="color:#bbb;font-size:11px;"></i>' +
        '<input type="text" placeholder="请输入关键字" style="border:none;outline:none;font-size:12px;flex:1;width:100%;color:#333;" onclick="event.stopPropagation();">' +
      '</div>' +
    '</div>' +
    '<div style="flex:1;overflow-y:auto;overflow-x:auto;padding:4px 0;white-space:nowrap;">' + treeHtml + '</div>';

  var wrapper = trigger.closest('.fact-edit-left');
  if (wrapper) {
    wrapper.style.position = 'relative';
    wrapper.style.overflow = 'visible';
    wrapper.appendChild(panel);
  }

  setTimeout(function() {
    document.addEventListener('click', _closeDbTreeOnClick);
  }, 0);
}

function _closeDbTreeOnClick(e) {
  var panel = document.getElementById('db-tree-panel');
  if (!panel) return;
  if (!panel.contains(e.target)) {
    _removeDbTreePanel();
  }
}

function _removeDbTreePanel() {
  var panel = document.getElementById('db-tree-panel');
  if (panel) panel.remove();
  document.removeEventListener('click', _closeDbTreeOnClick);
}

function selectDbTreeTable(el, tableName) {
  _removeDbTreePanel();
}
