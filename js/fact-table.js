// 事实表模块
function renderFactTable(container, config) {
  container.innerHTML = `
    <div class="split-layout">
      <div class="split-left">
        <div class="split-left-header">
          <span><i class="fa-solid fa-bars" style="margin-right:6px"></i>事实表分类</span>
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
            <i class="fa-regular fa-folder" style="color:#f90"></i> 财务分类
          </div>
        </div>
      </div>
      <div class="split-right">
        <div class="ind-tab-bar">
          <div class="ind-tab active"><i class="fa-regular fa-folder" style="color:#f90; margin-right:4px; font-size:12px"></i> 全部</div>
        </div>
        <div class="ind-toolbar">
          <div class="fact-new-wrap" style="position:relative; display:inline-block">
            <button class="btn btn-primary btn-sm" onclick="toggleFactNewMenu(this)">新建 <i class="fa-solid fa-caret-down" style="margin-left:2px"></i></button>
            <div class="fact-new-menu" style="display:none">
              <div class="fact-new-item" onclick="this.parentElement.style.display='none'; openFactForm()">
                <i class="fa-solid fa-link" style="color:var(--text-tertiary); margin-right:8px"></i>
                <div><div style="font-weight:500">数据库创建</div><div style="font-size:12px; color:var(--text-tertiary)">通过选择数据源，进行创建</div></div>
              </div>
              <div class="fact-new-item" onclick="this.parentElement.style.display='none'">
                <i class="fa-regular fa-copy" style="color:var(--text-tertiary); margin-right:8px"></i>
                <div><div style="font-weight:500">数据集创建</div><div style="font-size:12px; color:var(--text-tertiary)">通过选择数据集，进行创建</div></div>
              </div>
            </div>
          </div>
          <div style="flex:1"></div>
          <div class="select-box select-sm">请选择类型 <i class="fa-solid fa-chevron-down"></i></div>
          <div class="search-box search-sm">
            <i class="fa-solid fa-magnifying-glass"></i>
            <input type="text" placeholder="请输入名称">
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
                <th>类型</th>
                <th>操作者</th>
                <th>修改时间</th>
                <th>加载时间 <i class="fa-solid fa-sort" style="color:#c9cdd4; margin-left:2px; font-size:11px"></i></th>
                <th style="width:80px">操作</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>数据库表</td>
                <td>ShangsValley</td>
                <td>2025-12-23 16:44:52</td>
                <td>0.087秒</td>
                <td class="op-cell">
                  <i class="fa-regular fa-pen-to-square action-icon" title="编辑" onclick="openFactForm()"></i>
                  <i class="fa-regular fa-trash-can action-icon action-icon-danger" title="删除"></i>
                </td>
              </tr>
            </tbody>
          </table>
          <div class="pagination" style="padding:12px 16px">
            <span class="page-info">总共 1 条数据</span>
            <span class="page-nav">
              <span class="page-btn active">1</span>
            </span>
            <span class="page-size">20 条/页</span>
          </div>
        </div>
      </div>
    </div>`;
}

// ============ 事实表新建/编辑页面 ============
function openFactForm() {
  const tables = [
    'dfs_metrics_device_oee','dfs_metrics_line_daily','dfs_metrics_product_order_procedure',
    'dfs_metrics_quality_line_material_daily','dfs_metrics_quality_line_material_defect...',
    'dfs_metrics_team_daily','dfs_metrics_valuation_cal','dfs_metrics_work_order',
    'dfs_metrics_work_order_daily','dfs_metrics_work_order_hourly',
    'v_ams_product_order','v_ams_product_order_material','v_ams_purchase_receipt',
    'v_ams_purchase_receipt_material','v_ams_sale_order','v_ams_sale_order_material',
    'v_dfs_attendance','v_dfs_attendance_record','v_dfs_capacity'
  ];
  const listItems = tables.map((t,i) => `
    <div class="fact-table-item${i===0?' active':''}" onclick="selectFactTableItem(this,'${t}')">
      <i class="fa-solid fa-table" style="color:var(--text-tertiary); margin-right:6px; font-size:12px"></i>${t}
    </div>`).join('');

  const contentArea = document.getElementById('content-area');
  contentArea.innerHTML = `
    <div style="display:flex; height:100%">
      <div class="fact-edit-left">
        <div class="fact-edit-left-header">
          <i class="fa-solid fa-database" style="color:#f90; margin-right:6px"></i>
          <span style="font-weight:600">dfs_metrics</span>
          <span style="margin-left:auto; color:var(--text-tertiary); cursor:pointer"><i class="fa-solid fa-ellipsis-vertical"></i></span>
        </div>
        <div class="split-left-search">
          <i class="fa-solid fa-magnifying-glass"></i>
          <input type="text" placeholder="请输入关键字">
        </div>
        <div class="fact-table-list">${listItems}</div>
      </div>
      <div class="fact-edit-right">
        <div class="fact-edit-right-header">
          <span style="font-size:15px; font-weight:500">财务数据<i class="fa-regular fa-pen-to-square" style="color:var(--text-tertiary); margin-left:6px; cursor:pointer; font-size:13px"></i></span>
          <div style="display:flex; gap:8px">
            <button class="btn btn-sm" onclick="loadPage('fact-table')">返 回</button>
            <button class="btn btn-primary btn-sm">保存</button>
          </div>
        </div>
        <div style="padding:12px 20px 0; font-size:13px; color:var(--text-secondary)">
          <i class="fa-solid fa-table" style="margin-right:4px"></i> dfs_metrics_device_oee
        </div>
        <div class="fact-edit-tabs">
          <div class="fact-edit-tab active" onclick="switchFactTab(this,'preview')">预览</div>
          <div class="fact-edit-tab" onclick="switchFactTab(this,'fields')">字段属性</div>
          <div class="fact-edit-tab" onclick="switchFactTab(this,'query')">查询关联</div>
        </div>
        <div id="fact-tab-content" style="flex:1; overflow:auto"></div>
      </div>
    </div>`;
  renderFactPreviewTab();
}

function selectFactTableItem(el, name) {
  el.parentElement.querySelectorAll('.fact-table-item').forEach(i => i.classList.remove('active'));
  el.classList.add('active');
}

function switchFactTab(el, tab) {
  el.parentElement.querySelectorAll('.fact-edit-tab').forEach(t => t.classList.remove('active'));
  el.classList.add('active');
  if (tab === 'preview') renderFactPreviewTab();
  else if (tab === 'fields') renderFactFieldsTab();
  else if (tab === 'query') renderFactQueryTab();
}

function renderFactPreviewTab() {
  const previewData = [
    [1,1,200.0,1755.0,24.0,12.76,12.5],
    [2,2,340.0,0.0,0.0,9.05,11.34],
    [3,3,340.0,0.0,0.0,0.65,11.34],
    [4,80,340.0,0.0,0.0,0.86,11.34],
    [5,81,340.0,0.0,0.0,9.05,11.34],
    [6,82,340.0,0.0,0.0,9.05,11.34],
    [7,84,340.0,0.0,0.0,9.05,11.34],
    [8,85,340.0,0.0,0.0,9.05,11.34],
    [9,86,340.0,0.0,0.0,0.0,11.34],
    [10,87,340.0,0.0,0.0,0.0,11.34],
  ];
  const cols = ['id','device_id','theoretical_speed','amount','unqualified','run_time','load_time'];
  const rows = previewData.map(r => '<tr>' + r.map(c => `<td>${c}</td>`).join('') + '</tr>').join('');

  document.getElementById('fact-tab-content').innerHTML = `
    <div style="padding:16px 20px">
      <div style="font-size:13px; color:var(--text-secondary); margin-bottom:12px">
        <i class="fa-solid fa-table" style="margin-right:4px"></i>
        <strong>预览</strong> 当前预览10条数据，共计6009条，执行耗时0.012秒
      </div>
      <table class="data-table" style="font-size:13px">
        <thead><tr>${cols.map(c => `<th style="font-weight:600">${c}</th>`).join('')}</tr></thead>
        <tbody>${rows}</tbody>
      </table>
    </div>`;
}

function renderFactFieldsTab() {
  const fields = [
    { name:'id', alias:'id', type:'INT', prop:'度量' },
    { name:'device_id', alias:'device_id', type:'INT', prop:'度量' },
    { name:'theoretical_spe...', alias:'theoretical_speed', type:'DOUBLE', prop:'度量' },
    { name:'amount', alias:'amount', type:'DOUBLE', prop:'度量' },
    { name:'unqualified', alias:'unqualified', type:'DOUBLE', prop:'度量' },
    { name:'run_time', alias:'run_time', type:'DOUBLE', prop:'度量' },
    { name:'load_time', alias:'load_time', type:'DOUBLE', prop:'度量' },
    { name:'yield', alias:'yield', type:'DOUBLE', prop:'度量' },
    { name:'performance', alias:'performance', type:'DOUBLE', prop:'度量' },
    { name:'time_efficiency', alias:'time_efficiency', type:'DOUBLE', prop:'度量' },
    { name:'oee', alias:'oee', type:'DOUBLE', prop:'度量' },
    { name:'record_date', alias:'record_date', type:'DATETIME', cat:'统计时间', prop:'' },
    { name:'create_time', alias:'create_time', type:'DATETIME', cat:'', prop:'时间' },
    { name:'update_time', alias:'update_time', type:'DATETIME', cat:'', prop:'' },
  ];
  const rows = fields.map(f => `
    <tr>
      <td><a class="action-link">${f.name}</a></td>
      <td><input class="form-control" value="${f.alias}" style="font-size:12px"></td>
      <td>${f.type}</td>
      <td><select class="form-control form-select" style="font-size:12px"><option>请选择脱敏规则</option></select></td>
      <td class="op-cell"><i class="fa-regular fa-pen-to-square action-icon" title="编辑"></i></td>
      <td><select class="form-control form-select" style="font-size:12px"><option>请选择字段所属...</option>${f.cat ? `<option selected>${f.cat}</option>` : ''}</select></td>
      <td><select class="form-control form-select" style="font-size:12px"><option>请选择</option><option${f.prop==='度量'?' selected':''}>度量</option><option${f.prop==='时间'?' selected':''}>时间</option></select></td>
    </tr>`).join('');

  document.getElementById('fact-tab-content').innerHTML = `
    <div style="padding:16px 20px; overflow-x:auto">
      <table class="data-table" style="font-size:13px; min-width:900px">
        <thead>
          <tr>
            <th>字段名</th>
            <th>别名</th>
            <th>数据类型</th>
            <th>脱敏规则</th>
            <th>脱敏例外</th>
            <th>所属分类 <i class="fa-regular fa-square-check" style="margin-left:2px"></i></th>
            <th>字段属性</th>
          </tr>
        </thead>
        <tbody>${rows}</tbody>
      </table>
    </div>`;
}

function renderFactQueryTab() {
  document.getElementById('fact-tab-content').innerHTML = `
    <div style="padding:16px 20px">
      <table class="data-table" style="font-size:13px">
        <thead>
          <tr>
            <th>参数名</th>
            <th>关联字段</th>
            <th>逻辑关联</th>
            <th>默认值</th>
            <th style="width:60px">操作</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td><select class="form-control form-select" style="font-size:12px"><option>GLOBAL_TENANT_ID...</option></select></td>
            <td><select class="form-control form-select" style="font-size:12px"><option>amount</option></select></td>
            <td><select class="form-control form-select" style="font-size:12px"><option>大于等于(>=)</option><option>等于(=)</option><option>小于等于(<=)</option></select></td>
            <td><input class="form-control" style="font-size:12px"></td>
            <td class="op-cell"><i class="fa-regular fa-trash-can action-icon action-icon-danger"></i></td>
          </tr>
          <tr>
            <td><select class="form-control form-select" style="font-size:12px"><option>p_year(年度)</option></select></td>
            <td><select class="form-control form-select" style="font-size:12px"><option>device_id</option></select></td>
            <td><select class="form-control form-select" style="font-size:12px"><option>大于等于(>=)</option></select></td>
            <td><input class="form-control" style="font-size:12px"></td>
            <td class="op-cell"><i class="fa-regular fa-trash-can action-icon action-icon-danger"></i></td>
          </tr>
        </tbody>
      </table>
      <div style="margin-top:12px">
        <button class="btn btn-primary btn-sm" style="background:#fff; color:var(--primary-color); border-color:var(--primary-color)"><i class="fa-solid fa-plus" style="margin-right:4px"></i>添加参数</button>
      </div>
    </div>`;
}
