// 事实表模块

var _factRows = [
  { name:'生产订单事实表',     type:'数据库表', author:'ShangsValley', time:'2025-12-23 16:44:52', load:'0.087秒' },
  { name:'销售明细数据集',     type:'数据集',   author:'ShangsValley', time:'2025-11-18 10:22:30', load:'0.042秒' },
  { name:'设备运行记录表',     type:'数据库表', author:'Geh_aot',      time:'2025-10-05 14:15:08', load:'0.125秒' },
  { name:'库存变动数据集',     type:'数据集',   author:'Haom_a',       time:'2025-09-12 09:33:45', load:'0.018秒' },
  { name:'财务凭证事实表',     type:'数据库表', author:'ShangsValley', time:'2025-08-27 17:50:22', load:'0.063秒' },
  { name:'客户行为数据集',     type:'数据集',   author:'Haom_a',       time:'2025-07-14 11:08:16', load:'0.031秒' },
  { name:'物流配送记录表',     type:'数据库表', author:'Geh_aot',      time:'2025-06-30 08:45:39', load:'0.098秒' },
  { name:'质量检测事实表',     type:'数据库表', author:'ShangsValley', time:'2025-05-22 15:27:11', load:'0.055秒' },
  { name:'能耗采集数据集',     type:'数据集',   author:'Haom_a',       time:'2025-04-18 13:40:58', load:'0.022秒' },
  { name:'考勤打卡事实表',     type:'数据库表', author:'Geh_aot',      time:'2025-03-09 10:12:44', load:'0.076秒' },
];

function _buildFactRows() {
  return _factRows.map(function(r) {
    var editFn = r.type === '数据库表' ? 'openFactForm()' : 'openFactDatasetForm()';
    return '<tr>' +
      '<td><a class="action-link">' + r.name + '</a></td>' +
      '<td>' + r.type + '</td>' +
      '<td>' + r.author + '</td>' +
      '<td>' + r.time + '</td>' +
      '<td>' + r.load + '</td>' +
      '<td class="op-cell">' +
        '<i class="fa-regular fa-pen-to-square action-icon" title="编辑" onclick="' + editFn + '"></i>' +
        '<i class="fa-regular fa-trash-can action-icon action-icon-danger" title="删除" onclick="confirmDelete(\'' + r.name + '\')"></i>' +
      '</td>' +
    '</tr>';
  }).join('');
}

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
              <div class="fact-new-item" onclick="this.parentElement.style.display='none'; openFactDatasetForm()">
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
                <th>名称</th>
                <th>类型</th>
                <th>操作者</th>
                <th>修改时间</th>
                <th>加载时间 <i class="fa-solid fa-sort" style="color:#c9cdd4; margin-left:2px; font-size:11px"></i></th>
                <th style="width:80px">操作</th>
              </tr>
            </thead>
            <tbody>
              ${_buildFactRows()}
            </tbody>
          </table>
          <div class="pagination" style="padding:12px 16px">
            <span class="page-info">总共 28 条数据</span>
            <span class="page-nav">
              <span class="page-btn disabled">&lt;</span>
              <span class="page-btn active">1</span>
              <span class="page-btn">2</span>
              <span class="page-btn">&gt;</span>
            </span>
            <span class="page-size">10 条/页</span>
          </div>
        </div>
      </div>
    </div>`;
}

// ============ 事实表-数据集创建页面 ============
function openFactDatasetForm() {
  var previewCols = ['user_type','user_id','user_name','create_time','last_login'];
  var previewData = [
    [0,'03b69acbced24501a85dcac150617d3f','dbckjadmin','1650791531847','2022 05 26'],
    [0,'0c0d921c1e7c4cdc97569189c9609abd','hospitalul','1649900146203','2025 10 15'],
    [1,'1','root','','2023-04-25'],
    [1,'1.1b5e5a.1d24e4e9/b.1e14.1ccd/68dfb1','ceh_aotain','','2026-02-25'],
    [1,'1459324.18d9245a31b0.14ce8b.3a.0.5cf5','share_user','','2022-02-18'],
    [1,'15827/2e//24c4/f4980/4b5d0389c5b6ca','huangpy_aotain','','2025-10-15'],
    [0,'1G3836b805bb4dc18lc70aa2a1b8c329','jc','1648884946029','2022 07 20'],
    [0,'19bbb063c.15a4f3c93b0b03832da6fa1','caixun','1649384205581','2022 06 29'],
    [0,'1a5d792604ca4f12857563c0b2829812','modc dev','1762140579271','2025 11 03'],
    [0,'1caa98481bbb4c2193433a46c493a240','iptvadmin','1641369705670','2024 11 05'],
  ];
  var thHtml = previewCols.map(function(c){ return '<th style="font-weight:600;">'+c+'</th>'; }).join('');
  var trHtml = previewData.map(function(r){ return '<tr>' + r.map(function(c){ return '<td>'+c+'</td>'; }).join('') + '</tr>'; }).join('');

  var contentArea = document.getElementById('content-area');
  contentArea.innerHTML =
    '<div style="display:flex; height:100%">' +
      '<div class="fact-edit-left" style="position:relative;">' +
        '<div class="fact-edit-left-header">' +
          '<i class="fa-solid fa-list" style="margin-right:6px;"></i>' +
          '<span style="font-weight:600;">数据集列表</span>' +
        '</div>' +
        '<div style="padding:8px 12px;">' +
          '<div class="form-control" style="display:flex;align-items:center;justify-content:space-between;cursor:pointer;height:30px;font-size:12px;padding:0 8px;color:#333;" onclick="toggleFactDsTree(this)">' +
            '<span id="fact-ds-tree-selected">员工信息表</span>' +
            '<i class="fa-solid fa-magnifying-glass" style="color:#bbb;font-size:11px;"></i>' +
          '</div>' +
          '<div id="fact-ds-tree-dropdown" style="display:none;position:absolute;top:78px;left:0;min-width:260px;z-index:500;background:#fff;border:1px solid #e8e8e8;border-radius:6px;box-shadow:0 4px 16px rgba(0,0,0,.15);max-height:400px;overflow-y:auto;overflow-x:auto;padding:4px 0;white-space:nowrap;">' +
            _buildFactDsTree() +
          '</div>' +
        '</div>' +
      '</div>' +
      '<div class="fact-edit-right">' +
        '<div class="fact-edit-right-header">' +
          '<span style="font-size:15px; font-weight:500;">华润员工信息统计表之</span>' +
          '<div style="display:flex; gap:8px;">' +
            '<button class="btn btn-sm" onclick="loadPage(\'fact-table\')">返 回</button>' +
            '<button class="btn btn-primary btn-sm" onclick="loadPage(\'fact-table\')">保存</button>' +
          '</div>' +
        '</div>' +
        '<div class="fact-edit-tabs">' +
          '<div class="fact-edit-tab active" onclick="switchFactDsTab(this,\'preview\')">预览</div>' +
          '<div class="fact-edit-tab" onclick="switchFactDsTab(this,\'fields\')">字段属性</div>' +
        '</div>' +
        '<div id="fact-ds-tab-content" style="flex:1; overflow:auto;">' +
          '<div style="padding:16px 20px;">' +
            '<div style="font-size:13px; color:var(--text-secondary); margin-bottom:12px;">' +
              '<i class="fa-solid fa-table" style="margin-right:4px;"></i>' +
              '<strong>预览</strong> 当前预览10条数据，共计38条，执行耗时0.254秒' +
            '</div>' +
            '<div style="overflow-x:auto;">' +
              '<table class="data-table" style="font-size:13px;">' +
                '<thead><tr>' + thHtml + '</tr></thead>' +
                '<tbody>' + trHtml + '</tbody>' +
              '</table>' +
            '</div>' +
          '</div>' +
        '</div>' +
      '</div>' +
    '</div>';
}

function _buildFactDsTree() {
  var nt = function(indent, icon, iconColor, label, hasChildren, isOpen, isLeaf, isSelected) {
    var pad = indent * 18;
    var arrow = hasChildren
      ? '<i class="fa-solid fa-caret-' + (isOpen ? 'down' : 'right') + '" style="font-size:10px;color:#999;width:10px;flex-shrink:0;"></i>'
      : '<span style="width:10px;flex-shrink:0;"></span>';
    var selStyle = isSelected ? 'background:#e6f7ff;font-weight:500;' : '';
    var iconHtml = '<i class="fa-solid ' + icon + '" style="color:' + iconColor + ';font-size:12px;flex-shrink:0;"></i>';
    var clickAttr = isLeaf ? ' onclick="event.stopPropagation();selectFactDsTreeNode(this,\'' + label.replace(/'/g,"\\'") + '\')"' : '';
    return '<div style="padding:3px 8px 3px ' + (8 + pad) + 'px;display:flex;align-items:center;gap:5px;font-size:13px;color:#333;cursor:pointer;' + selStyle + '"' + clickAttr + '>' + arrow + iconHtml + '<span>' + label + '</span></div>';
  };
  return nt(0,'fa-folder','#f5a623','数据集',true,true,false,false) +
    nt(1,'fa-folder','#f5a623','test',true,false,false,false) +
    nt(1,'fa-folder','#f5a623','物流项目',true,false,false,false) +
    nt(1,'fa-folder','#f5a623','销售订单',true,false,false,false) +
    nt(1,'fa-folder','#f5a623','维度数据集',true,true,false,false) +
      nt(2,'fa-table','#8c8c8c','设备维度数据',false,false,true,false) +
    nt(1,'fa-folder','#f5a623','指标体系',true,true,false,false) +
      nt(2,'fa-table','#4080ff','员工信息表',false,false,true,true) +
      nt(2,'fa-table','#8c8c8c','生产订单表',false,false,true,false);
}

function toggleFactDsTree() {
  var dd = document.getElementById('fact-ds-tree-dropdown');
  if (!dd) return;
  if (dd.style.display === 'none') {
    dd.style.display = 'block';
    setTimeout(function() { document.addEventListener('click', _closeFactDsTreeOnClick); }, 0);
  } else {
    dd.style.display = 'none';
    document.removeEventListener('click', _closeFactDsTreeOnClick);
  }
}

function _closeFactDsTreeOnClick(e) {
  var dd = document.getElementById('fact-ds-tree-dropdown');
  if (!dd) return;
  var wrapper = dd.parentElement;
  if (wrapper && !wrapper.contains(e.target)) {
    dd.style.display = 'none';
    document.removeEventListener('click', _closeFactDsTreeOnClick);
  }
}

function selectFactDsTreeNode(el, name) {
  var label = document.getElementById('fact-ds-tree-selected');
  if (label) { label.textContent = name; label.style.color = '#333'; }
  var dd = document.getElementById('fact-ds-tree-dropdown');
  if (dd) { dd.style.display = 'none'; }
  document.removeEventListener('click', _closeFactDsTreeOnClick);
}

function switchFactDsTab(el, tab) {
  el.parentElement.querySelectorAll('.fact-edit-tab').forEach(function(t){ t.classList.remove('active'); });
  el.classList.add('active');
  var container = document.getElementById('fact-ds-tab-content');
  if (!container) return;
  if (tab === 'preview') {
    renderFactDsPreview(container);
  } else if (tab === 'fields') {
    renderFactDsFields(container);
  }
}

function renderFactDsPreview(container) {
  var cols = ['user_type','user_id','user_name','create_time','last_login'];
  var data = [
    [0,'03b69acbced24501a85dcac150617d3f','dbckjadmin','1650791531847','2022 05 26'],
    [0,'0c0d921c1e7c4cdc97569189c9609abd','hospitalul','1649900146203','2025 10 15'],
    [1,'1','root','','2023-04-25'],
    [1,'1.1b5e5a.1d24e4e9/b.1e14.1ccd/68dfb1','ceh_aotain','','2026-02-25'],
    [1,'1459324.18d9245a31b0.14ce8b.3a.0.5cf5','share_user','','2022-02-18'],
    [1,'15827/2e//24c4/f4980/4b5d0389c5b6ca','huangpy_aotain','','2025-10-15'],
    [0,'1G3836b805bb4dc18lc70aa2a1b8c329','jc','1648884946029','2022 07 20'],
    [0,'19bbb063c.15a4f3c93b0b03832da6fa1','caixun','1649384205581','2022 06 29'],
    [0,'1a5d792604ca4f12857563c0b2829812','modc dev','1762140579271','2025 11 03'],
    [0,'1caa98481bbb4c2193433a46c493a240','iptvadmin','1641369705670','2024 11 05'],
  ];
  var th = cols.map(function(c){ return '<th style="font-weight:600;">'+c+'</th>'; }).join('');
  var tr = data.map(function(r){ return '<tr>' + r.map(function(c){ return '<td>'+c+'</td>'; }).join('') + '</tr>'; }).join('');
  container.innerHTML =
    '<div style="padding:16px 20px;">' +
      '<div style="font-size:13px; color:var(--text-secondary); margin-bottom:12px;">' +
        '<i class="fa-solid fa-table" style="margin-right:4px;"></i>' +
        '<strong>预览</strong> 当前预览10条数据，共计38条，执行耗时0.254秒' +
      '</div>' +
      '<div style="overflow-x:auto;">' +
        '<table class="data-table" style="font-size:13px;"><thead><tr>' + th + '</tr></thead><tbody>' + tr + '</tbody></table>' +
      '</div>' +
    '</div>';
}

function renderFactDsFields(container) {
  var fields = [
    { name:'user_type', alias:'user_type', type:'INT', prop:'度量', extra:'' },
    { name:'user_id', alias:'user_id', type:'VARCHAR', prop:'维度', extra:'订单状态' },
    { name:'user_name', alias:'user_name', type:'VARCHAR', prop:'维度', extra:'' },
    { name:'create_time', alias:'create_time', type:'BIGINT', prop:'统计时间', extra:'yyyyMMdd' },
    { name:'last_login', alias:'last_login', type:'VARCHAR', prop:'属性', extra:'华润业务分类' },
  ];
  var propOptions = ['度量','维度','统计时间','时间','属性'];
  var rows = fields.map(function(f, idx) {
    var key = 'fds-' + idx;
    var optHtml = propOptions.map(function(o){ return '<option' + (o===f.prop?' selected':'') + '>' + o + '</option>'; }).join('');
    var linkedHtml = _buildFactFieldLinked(f.prop, f.extra, key);
    return '<tr>' +
      '<td><a class="action-link">' + f.name + '</a></td>' +
      '<td><input class="form-control" value="' + f.alias + '" style="font-size:12px;"></td>' +
      '<td>' + f.type + '</td>' +
      '<td style="min-width:280px;">' +
        '<div style="display:flex;align-items:center;gap:6px;flex-wrap:nowrap;">' +
          '<select class="form-control form-select" style="font-size:12px;width:90px;flex-shrink:0;" onchange="onFactFieldPropChange(this,\'' + key + '\')">' + optHtml + '</select>' +
          '<span id="fact-field-linked-' + key + '" style="flex:1;min-width:0;">' + linkedHtml + '</span>' +
        '</div>' +
      '</td>' +
    '</tr>';
  }).join('');
  container.innerHTML =
    '<div style="padding:16px 20px; overflow-x:auto;">' +
      '<div style="font-size:14px;font-weight:600;color:#333;margin-bottom:10px;">字段属性</div>' +
      '<table class="data-table" style="font-size:13px; min-width:600px;">' +
        '<thead><tr><th>字段名</th><th>别名</th><th>数据类型</th><th>字段属性</th></tr></thead>' +
        '<tbody>' + rows + '</tbody>' +
      '</table>' +
    '</div>';
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
          <span style="margin-left:auto; color:var(--text-tertiary); cursor:pointer; position:relative;" onclick="toggleFactDbTreePanel(this)"><i class="fa-solid fa-ellipsis-vertical"></i></span>
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
            <button class="btn btn-primary btn-sm" onclick="loadPage('fact-table')">保存</button>
          </div>
        </div>
        <div style="padding:12px 20px 0; font-size:13px; color:var(--text-secondary)">
          <i class="fa-solid fa-table" style="margin-right:4px"></i> dfs_metrics_device_oee
        </div>
        <div class="fact-edit-tabs">
          <div class="fact-edit-tab active" onclick="switchFactTab(this,'preview')">预览</div>
          <div class="fact-edit-tab" onclick="switchFactTab(this,'fields')">字段属性</div>
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
  var fields = [
    { name:'id', alias:'id', type:'INT', prop:'度量', extra:'' },
    { name:'device_id', alias:'device_id', type:'INT', prop:'维度', extra:'设备维度' },
    { name:'theoretical_spe...', alias:'theoretical_speed', type:'DOUBLE', prop:'度量', extra:'' },
    { name:'amount', alias:'amount', type:'DOUBLE', prop:'度量', extra:'' },
    { name:'unqualified', alias:'unqualified', type:'DOUBLE', prop:'度量', extra:'' },
    { name:'run_time', alias:'run_time', type:'DOUBLE', prop:'度量', extra:'' },
    { name:'load_time', alias:'load_time', type:'DOUBLE', prop:'度量', extra:'' },
    { name:'yield', alias:'yield', type:'DOUBLE', prop:'度量', extra:'' },
    { name:'performance', alias:'performance', type:'DOUBLE', prop:'度量', extra:'' },
    { name:'time_efficiency', alias:'time_efficiency', type:'DOUBLE', prop:'度量', extra:'' },
    { name:'oee', alias:'oee', type:'DOUBLE', prop:'度量', extra:'' },
    { name:'record_date', alias:'record_date', type:'DATETIME', prop:'统计时间', extra:'yyyyMMdd' },
    { name:'create_time', alias:'create_time', type:'DATETIME', prop:'时间', extra:'yyyyMMdd' },
    { name:'update_time', alias:'update_time', type:'DATETIME', prop:'属性', extra:'华润业务分类' },
  ];
  var propOptions = ['度量','维度','统计时间','时间','属性'];
  var rows = fields.map(function(f, idx) {
    var key = 'fdb-' + idx;
    var optHtml = propOptions.map(function(o){ return '<option' + (o===f.prop?' selected':'') + '>' + o + '</option>'; }).join('');
    var linkedHtml = _buildFactFieldLinked(f.prop, f.extra, key);
    return '<tr>' +
      '<td><a class="action-link">' + f.name + '</a></td>' +
      '<td><input class="form-control" value="' + f.alias + '" style="font-size:12px"></td>' +
      '<td>' + f.type + '</td>' +
      '<td style="min-width:280px;">' +
        '<div style="display:flex;align-items:center;gap:6px;flex-wrap:nowrap;">' +
          '<select class="form-control form-select" style="font-size:12px;width:90px;flex-shrink:0;" onchange="onFactFieldPropChange(this,\'' + key + '\')">' + optHtml + '</select>' +
          '<span id="fact-field-linked-' + key + '" style="flex:1;min-width:0;">' + linkedHtml + '</span>' +
        '</div>' +
      '</td>' +
    '</tr>';
  }).join('');

  document.getElementById('fact-tab-content').innerHTML =
    '<div style="padding:16px 20px; overflow-x:auto">' +
      '<div style="font-size:14px;font-weight:600;color:#333;margin-bottom:10px;">字段属性</div>' +
      '<table class="data-table" style="font-size:13px; min-width:600px">' +
        '<thead><tr><th>字段名</th><th>别名</th><th>数据类型</th><th>字段属性</th></tr></thead>' +
        '<tbody>' + rows + '</tbody>' +
      '</table>' +
    '</div>';
}

// ============ 事实表数据库目录树面板 ============
function toggleFactDbTreePanel(trigger) {
  var existing = document.getElementById('fact-db-tree-panel');
  if (existing) { _removeFactDbTreePanel(); return; }

  var nt = function(indent, icon, iconColor, label, hasChildren, isOpen, isSelected) {
    var pad = indent * 20;
    var arrow = hasChildren
      ? '<i class="fa-solid fa-caret-' + (isOpen ? 'down' : 'right') + '" style="font-size:10px;color:#999;width:12px;flex-shrink:0;cursor:pointer;"></i>'
      : '<span style="width:12px;flex-shrink:0;"></span>';
    var selStyle = isSelected ? 'background:#e6f7ff;font-weight:500;' : '';
    var iconHtml = '<i class="fa-solid ' + icon + '" style="color:' + iconColor + ';font-size:13px;flex-shrink:0;"></i>';
    var clickAttr = (!hasChildren) ? ' onclick="event.stopPropagation();selectFactDbTreeTable(this,\'' + label.replace(/'/g,"\\'") + '\')"' : '';
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
  panel.id = 'fact-db-tree-panel';
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
    document.addEventListener('click', _closeFactDbTreeOnClick);
  }, 0);
}

function _closeFactDbTreeOnClick(e) {
  var panel = document.getElementById('fact-db-tree-panel');
  if (!panel) return;
  if (!panel.contains(e.target)) {
    _removeFactDbTreePanel();
  }
}

function _removeFactDbTreePanel() {
  var panel = document.getElementById('fact-db-tree-panel');
  if (panel) panel.remove();
  document.removeEventListener('click', _closeFactDbTreeOnClick);
}

function selectFactDbTreeTable(el, tableName) {
  _removeFactDbTreePanel();
}

// ============ 事实表字段属性联动 ============
var _factTimeFormats = ['yyyy','yyyyMM','yyyyMMdd','yyyyMMdd HH','yyyyMMdd HH:mm','yyyyMMdd HH:mm:ss','yyyy-MM','yyyy-MM-dd'];

function _buildFactFieldLinked(prop, value, key) {
  if (prop === '度量') return '';
  if (prop === '维度' || prop === '属性') {
    var val = value || '';
    return '<div style="position:relative;display:inline-flex;align-items:center;min-width:140px;max-width:200px;border:1px solid #d9d9d9;border-radius:4px;padding:2px 6px;height:28px;background:#fff;cursor:pointer;" onclick="toggleFactFieldDimTree(this,\'' + key + '\')">' +
      '<span style="flex:1;font-size:12px;color:' + (val?'#333':'#bbb') + ';overflow:hidden;text-overflow:ellipsis;white-space:nowrap;">' + (val||'请选择') + '</span>' +
      (val ? '<i class="fa-solid fa-circle-xmark" style="color:#bfbfbf;font-size:12px;flex-shrink:0;margin-left:4px;" onclick="event.stopPropagation();clearFactFieldDimValue(this,\'' + key + '\')"></i>' : '') +
    '</div>';
  }
  if (prop === '统计时间' || prop === '时间') {
    var curVal = value || 'yyyyMMdd';
    var opts = _factTimeFormats.map(function(fmt){ return '<option' + (fmt===curVal?' selected':'') + '>' + fmt + '</option>'; }).join('');
    return '<select class="form-control form-select" style="font-size:12px;width:160px;">' + opts + '</select>';
  }
  return '';
}

function onFactFieldPropChange(sel, key) {
  var span = document.getElementById('fact-field-linked-' + key);
  if (span) span.innerHTML = _buildFactFieldLinked(sel.value, '', key);
}

function toggleFactFieldDimTree(trigger, key) {
  var existingId = 'fact-field-dim-dd-' + key;
  var existing = document.getElementById(existingId);
  if (existing) { existing.remove(); return; }
  document.querySelectorAll('[id^="fact-field-dim-dd-"]').forEach(function(el){ el.remove(); });

  var dimTree =
    '<div style="padding:3px 12px;display:flex;align-items:center;gap:5px;font-size:13px;color:#999;cursor:default;">' +
      '<i class="fa-solid fa-caret-down" style="font-size:10px;color:#999;width:10px;"></i><span>君兰维度</span></div>' +
    '<div style="padding:3px 12px 3px 32px;font-size:13px;color:#333;cursor:pointer;font-weight:500;" onmouseover="this.style.background=\'#f2f3f5\'" onmouseout="this.style.background=\'\'" onclick="event.stopPropagation();selectFactFieldDimNode(this,\'设备维度\',\'' + key + '\')">设备维度</div>' +
    '<div style="padding:3px 12px;display:flex;align-items:center;gap:5px;font-size:13px;color:#999;cursor:default;">' +
      '<i class="fa-solid fa-caret-down" style="font-size:10px;color:#999;width:10px;"></i><span>华润</span></div>' +
    '<div style="padding:3px 12px 3px 24px;display:flex;align-items:center;gap:5px;font-size:13px;color:#999;cursor:default;">' +
      '<i class="fa-solid fa-caret-down" style="font-size:10px;color:#999;width:10px;"></i><span style="font-weight:500;color:#333;">指标体系</span></div>' +
    '<div style="padding:3px 12px 3px 48px;font-size:13px;color:#666;cursor:pointer;" onmouseover="this.style.background=\'#f2f3f5\'" onmouseout="this.style.background=\'\'" onclick="event.stopPropagation();selectFactFieldDimNode(this,\'人员分类\',\'' + key + '\')">人员分类</div>' +
    '<div style="padding:3px 12px 3px 48px;font-size:13px;color:#666;cursor:pointer;" onmouseover="this.style.background=\'#f2f3f5\'" onmouseout="this.style.background=\'\'" onclick="event.stopPropagation();selectFactFieldDimNode(this,\'华润业务分类\',\'' + key + '\')">华润业务分类</div>' +
    '<div style="padding:3px 12px 3px 48px;font-size:13px;color:#666;cursor:pointer;" onmouseover="this.style.background=\'#f2f3f5\'" onmouseout="this.style.background=\'\'" onclick="event.stopPropagation();selectFactFieldDimNode(this,\'订单状态\',\'' + key + '\')">订单状态</div>' +
    '<div style="padding:3px 12px;display:flex;align-items:center;gap:5px;font-size:13px;color:#999;cursor:default;">' +
      '<i class="fa-solid fa-caret-down" style="font-size:10px;color:#999;width:10px;"></i><span>test</span></div>' +
    '<div style="padding:3px 12px 3px 32px;font-size:13px;color:#333;cursor:pointer;font-weight:500;" onmouseover="this.style.background=\'#f2f3f5\'" onmouseout="this.style.background=\'\'" onclick="event.stopPropagation();selectFactFieldDimNode(this,\'客户\',\'' + key + '\')">客户</div>';

  var dd = document.createElement('div');
  dd.id = existingId;
  dd.style.cssText = 'position:absolute;top:100%;left:0;z-index:600;background:#fff;border:1px solid #e8e8e8;border-radius:6px;box-shadow:0 4px 16px rgba(0,0,0,.15);max-height:280px;overflow-y:auto;min-width:200px;padding:6px 0;margin-top:2px;';
  dd.innerHTML = dimTree;
  trigger.style.position = 'relative';
  trigger.appendChild(dd);
  setTimeout(function() {
    var handler = function(e) {
      if (!dd.contains(e.target) && !trigger.contains(e.target)) { dd.remove(); document.removeEventListener('click', handler); }
    };
    document.addEventListener('click', handler);
  }, 0);
}

function selectFactFieldDimNode(el, name, key) {
  var dd = document.getElementById('fact-field-dim-dd-' + key);
  if (dd) dd.remove();
  var span = document.getElementById('fact-field-linked-' + key);
  if (!span) return;
  var propSel = span.parentElement.querySelector('select');
  var prop = propSel ? propSel.value : '维度';
  span.innerHTML = _buildFactFieldLinked(prop, name, key);
}

function clearFactFieldDimValue(icon, key) {
  var span = document.getElementById('fact-field-linked-' + key);
  if (!span) return;
  var propSel = span.parentElement.querySelector('select');
  var prop = propSel ? propSel.value : '维度';
  span.innerHTML = _buildFactFieldLinked(prop, '', key);
}
