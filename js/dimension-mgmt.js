// 维度管理模块

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
        <div class="category-tree">
          <div class="cat-node selected" onclick="selectCatNode(this)">
            <i class="fa-regular fa-folder" style="color:#f90"></i> 全部
          </div>
          <div class="cat-node" onclick="selectCatNode(this)">
            <i class="fa-regular fa-folder" style="color:#f90"></i> 前兰维度
          </div>
          <div class="cat-node" onclick="selectCatNode(this)">
            <i class="fa-regular fa-folder" style="color:#f90"></i> test
          </div>
          <div class="cat-node" onclick="selectCatNode(this)">
            <span class="cat-toggle"><i class="fa-solid fa-caret-right"></i></span>
            <i class="fa-regular fa-folder" style="color:#f90"></i> 指标体系
          </div>
        </div>
      </div>
      <!-- 右侧内容 -->
      <div class="split-right">
        <div class="ind-tab-bar">
          <div class="ind-tab active"><i class="fa-regular fa-folder" style="color:#f90; margin-right:4px; font-size:12px"></i> 全部</div>
        </div>
        <div class="ind-toolbar">
          <button class="btn btn-primary btn-sm" onclick="openDimensionForm('new')">新建</button>
          <button class="btn btn-sm"><i class="fa-solid fa-download"></i> 导入</button>
          <button class="btn btn-sm"><i class="fa-solid fa-upload"></i> 导出</button>
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
              <tr>
                <td><input type="checkbox"></td>
                <td>di3</td>
                <td><a class="action-link" onclick="openDimensionDataManual('订单状态')">订单状态</a></td>
                <td><span style="font-weight:500">手工录入</span></td>
                <td></td>
                <td class="op-cell">
                  <i class="fa-regular fa-pen-to-square action-icon" title="编辑" onclick="openDimensionForm('edit',{code:'di3',name:'订单状态',cat:'指标体系',dataType:'manual'})"></i>
                  <i class="fa-solid fa-database action-icon" title="数据管理" onclick="openDimensionDataManual('订单状态')"></i>
                  <i class="fa-regular fa-trash-can action-icon action-icon-danger" title="删除"></i>
                </td>
              </tr>
              <tr>
                <td><input type="checkbox"></td>
                <td>device</td>
                <td><a class="action-link" onclick="openDimensionDataDynamic('设备维度')">设备维度</a></td>
                <td><span style="font-weight:500">动态数据</span></td>
                <td></td>
                <td class="op-cell">
                  <i class="fa-regular fa-pen-to-square action-icon" title="编辑" onclick="openDimensionForm('edit',{code:'device',name:'设备维度',cat:'指标体系',dataType:'dynamic'})"></i>
                  <i class="fa-solid fa-database action-icon" title="数据管理" onclick="openDimensionDataDynamic('设备维度')"></i>
                  <i class="fa-regular fa-trash-can action-icon action-icon-danger" title="删除"></i>
                </td>
              </tr>
              <tr>
                <td><input type="checkbox"></td>
                <td>test</td>
                <td><a class="action-link" onclick="openDimensionDataManual('客户')">客户</a></td>
                <td><span style="font-weight:500">手工录入</span></td>
                <td></td>
                <td class="op-cell">
                  <i class="fa-regular fa-pen-to-square action-icon" title="编辑" onclick="openDimensionForm('edit',{code:'test',name:'客户',cat:'指标体系',dataType:'manual'})"></i>
                  <i class="fa-solid fa-database action-icon" title="数据管理" onclick="openDimensionDataManual('客户')"></i>
                  <i class="fa-regular fa-trash-can action-icon action-icon-danger" title="删除"></i>
                </td>
              </tr>
            </tbody>
          </table>
          <div class="pagination">
            <span class="page-info">总共 3 条数据</span>
            <div class="page-btn"><i class="fa-solid fa-chevron-left"></i></div>
            <div class="page-btn active">1</div>
            <div class="page-btn"><i class="fa-solid fa-chevron-right"></i></div>
            <span class="page-info" style="margin-left:8px">10 条/页</span>
          </div>
        </div>
      </div>
    </div>`;
}

// ============ 维度新建/编辑表单 ============
function openDimensionForm(mode, data) {
  const contentArea = document.getElementById('content-area');
  const isEdit = mode === 'edit';
  const d = data || { code: '', name: '', cat: '', dataType: 'dynamic' };
  const title = isEdit ? '编辑维度' : '新建维度';

  const isDynamic = d.dataType === 'dynamic';
  const configRows = isEdit ? `
    <tr>
      <td><span class="required">*</span>维度编码</td>
      <td><select class="form-control form-select"><option>device_id(设备id)</option></select></td>
    </tr>
    <tr>
      <td><span class="required">*</span>维度名称</td>
      <td><select class="form-control form-select"><option>device_name(设施名称)</option></select></td>
    </tr>
    <tr>
      <td>父类编码</td>
      <td><select class="form-control form-select"><option></option></select></td>
    </tr>
    <tr>
      <td>厂区</td>
      <td>
        <div style="display:flex; align-items:center; gap:8px">
          <select class="form-control form-select" style="flex:1"><option>aid(厂区id)</option></select>
          <i class="fa-regular fa-trash-can" style="color:#f53f3f; cursor:pointer"></i>
        </div>
      </td>
    </tr>
    <tr>
      <td>分类</td>
      <td>
        <div style="display:flex; align-items:center; gap:8px">
          <select class="form-control form-select" style="flex:1"><option>type_name(分类名称)</option></select>
          <i class="fa-regular fa-trash-can" style="color:#f53f3f; cursor:pointer"></i>
        </div>
      </td>
    </tr>` : `
    <tr>
      <td><span class="required">*</span>维度编码</td>
      <td><select class="form-control form-select"><option>请选择</option></select></td>
    </tr>
    <tr>
      <td><span class="required">*</span>维度名称</td>
      <td><select class="form-control form-select"><option>请选择</option></select></td>
    </tr>
    <tr>
      <td>父类编码</td>
      <td><select class="form-control form-select"><option></option></select></td>
    </tr>`;

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
              <label class="dim-radio"><input type="radio" name="dim-data-type" value="dynamic" ${isDynamic ? 'checked' : ''}> 动态数据</label>
              <label class="dim-radio"><input type="radio" name="dim-data-type" value="manual" ${!isDynamic ? 'checked' : ''}> 手工录入</label>
            </div>
          </div>
          ${isDynamic ? `
          <div class="dim-form-row">
            <label class="dim-form-label"></label>
            <div class="dim-form-field">
              <select class="form-control form-select" style="max-width:400px">
                <option selected>设备维度数据</option>
                <option>用户维度数据</option>
              </select>
            </div>
          </div>` : ''}
          <div class="dim-form-row" style="align-items:flex-start">
            <label class="dim-form-label">数据配置：</label>
            <div class="dim-form-field">
              <table class="dim-config-table">
                <thead>
                  <tr><th>属性</th><th>数据集字段</th></tr>
                </thead>
                <tbody>${configRows}</tbody>
              </table>
              <a class="action-link" style="display:inline-block; margin-top:8px; font-size:13px"><i class="fa-regular fa-plus-square" style="margin-right:4px"></i>新增一行</a>
            </div>
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
        <i class="fa-regular fa-pen-to-square action-icon" title="编辑"></i>
        <i class="fa-regular fa-trash-can action-icon action-icon-danger" title="删除"></i>
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
          <button class="btn btn-sm">新增</button>
          <button class="btn btn-sm"><i class="fa-solid fa-download"></i> 导入</button>
          <button class="btn btn-sm"><i class="fa-solid fa-upload"></i> 导出</button>
          <button class="btn btn-sm">删除</button>
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
