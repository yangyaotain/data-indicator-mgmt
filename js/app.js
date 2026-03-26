/**
 * 数据指标管理模块 - 核心路由与公共函数
 */

// 菜单展开/收起
function toggleMenu(header) {
  const menuItem = header.parentElement;
  const subMenu = menuItem.querySelector('.sub-menu');

  if (!subMenu) return;

  const isOpen = subMenu.classList.contains('open');

  if (isOpen) {
    subMenu.classList.remove('open');
    header.classList.remove('expanded');
  } else {
    subMenu.classList.add('open');
    header.classList.add('expanded');
  }
}

// 三级分组展开/收起
function toggleSubGroup(header) {
  const menu = header.nextElementSibling;
  if (!menu) return;
  const isOpen = menu.classList.contains('open');
  if (isOpen) {
    menu.classList.remove('open');
    header.classList.remove('expanded');
  } else {
    menu.classList.add('open');
    header.classList.add('expanded');
  }
}

// 子菜单项激活切换
function setActiveSubMenu(el) {
  document.querySelectorAll('.sub-group-menu li, .sub-menu > li:not(.sub-group)').forEach(li => li.classList.remove('active'));
  el.closest('li').classList.add('active');
}

// 页面路由映射
const pageConfig = {
  // 可视化
  'dashboard-mgmt':    { title: '看板管理', icon: 'fa-solid fa-tv', desc: '管理和配置数据可视化看板' },
  'dashboard':         { title: '仪表盘', icon: 'fa-solid fa-gauge-high', desc: '查看和管理数据仪表盘' },
  'data-insight':      { title: '数据洞察', icon: 'fa-solid fa-magnifying-glass-chart', desc: '深度分析数据，发现业务洞察' },
  'indicator-insight': { title: '指标洞察', icon: 'fa-solid fa-chart-pie', desc: '分析指标趋势与关联关系' },
  // 指标体系
  'indicator-ledger': { title: '指标台账', icon: 'fa-solid fa-book', desc: '查看指标台账，浏览完整指标清单' },
  'indicator-mgmt':  { title: '指标管理', icon: 'fa-solid fa-chart-line', desc: '管理和维护数据指标定义、分类与配置' },
  'dimension-mgmt':  { title: '维度管理', icon: 'fa-solid fa-table-cells', desc: '管理指标的分析维度与维度属性' },
  'summary-table':   { title: '汇总表', icon: 'fa-solid fa-arrows-spin', desc: '查看和管理指标汇总数据表' },
  'indicator-model': { title: '模板管理', icon: 'fa-solid fa-diagram-project', desc: '设计和维护指标计算模型与派生关系' },
  'time-period':     { title: '时间周期', icon: 'fa-regular fa-clock', desc: '配置指标的统计时间周期与粒度' },
  'fact-table':      { title: '事实表', icon: 'fa-solid fa-scroll', desc: '管理底层事实数据表及其映射关系' },
  'indicator-audit': { title: '指标审核', icon: 'fa-solid fa-list-check', desc: '审核指标定义变更与发布申请' },
  // 数据管理
  'query-widget':    { title: '查询控件', icon: 'fa-solid fa-magnifying-glass', desc: '管理和配置数据查询控件' },
  'dataset':         { title: '数据集', icon: 'fa-solid fa-server', desc: '管理和配置数据集资源' },
  // 配置管理
  'component-mgmt':  { title: '组件管理', icon: 'fa-solid fa-puzzle-piece', desc: '管理和配置系统组件' },
  'material-mgmt':   { title: '素材管理', icon: 'fa-regular fa-image', desc: '管理和配置素材资源' },
  'system-settings': { title: '存储配置', icon: 'fa-solid fa-database', desc: '数据库存储配置管理' },
};

// 页面加载
function loadPage(pageName) {
  const contentArea = document.getElementById('content-area');
  const config = pageConfig[pageName];

  if (!config) {
    contentArea.innerHTML = `
      <div class="placeholder-content">
        <div class="placeholder-icon"><i class="fa-regular fa-file-lines"></i></div>
        <h2>页面不存在</h2>
        <p>请从左侧菜单选择功能模块</p>
      </div>`;
    return;
  }

  const renderers = {
    'dashboard-mgmt': renderDashboardMgmt,
    'dashboard': renderDashboard,
    'indicator-ledger': renderIndicatorLedger,
    'indicator-mgmt': renderIndicatorMgmt,
    'dimension-mgmt': renderDimensionMgmt,
    'summary-table': renderSummaryTable,
    'indicator-model': renderIndicatorModel,
    'time-period': renderTimePeriod,
    'fact-table': renderFactTable,
    'indicator-audit': renderIndicatorAudit,
    'dataset': renderDataset,
    'indicator-insight': renderIndicatorInsight,
    'system-settings': renderSystemSettings,
  };

  const renderer = renderers[pageName];
  if (renderer) {
    renderer(contentArea, config);
  } else {
    renderDefaultPage(contentArea, config);
  }
}

function renderDefaultPage(container, config) {
  container.innerHTML = `
    <div class="placeholder-content">
      <div class="placeholder-icon"><i class="${config.icon}"></i></div>
      <h2>${config.title}</h2>
      <p>${config.desc}</p>
      <p class="placeholder-hint">页面内容将根据需求补充</p>
    </div>`;
}

// 分类树节点选择
function selectCatNode(el) {
  el.closest('.category-tree').querySelectorAll('.cat-node').forEach(n => n.classList.remove('selected'));
  el.classList.add('selected');
}

// ============ 公共指标分类树数据 ============
var _commonCatTree = [
  { name:'全部', open:true, children:[
    { name:'人员信息管理', open:true, children:[
      { name:'日常人事管理', open:true, children:[
        { name:'员工信息管理' },
        { name:'考勤管理' },
      ]},
      { name:'薪酬福利管理', open:false, children:[
        { name:'薪资核算' },
        { name:'社保公积金' },
      ]},
      { name:'培训发展', open:false, children:[
        { name:'培训计划' },
        { name:'培训评估' },
      ]},
    ]},
    { name:'财务管理', open:true, children:[
      { name:'收入管理', open:true, children:[
        { name:'营业收入' },
        { name:'利润分析' },
      ]},
      { name:'成本管理', open:false, children:[
        { name:'生产成本' },
        { name:'期间费用' },
      ]},
      { name:'预算管理' },
    ]},
    { name:'生产管理', open:false, children:[
      { name:'订单管理', children:[
        { name:'生产订单' },
        { name:'工单跟踪' },
      ]},
      { name:'质量管理', children:[
        { name:'质量检测' },
        { name:'缺陷统计' },
      ]},
      { name:'设备管理' },
    ]},
    { name:'销售管理', open:false, children:[
      { name:'客户管理', children:[
        { name:'客户分析' },
        { name:'客户留存' },
      ]},
      { name:'订单管理' },
    ]},
    { name:'采购管理', open:false, children:[
      { name:'供应商管理' },
      { name:'采购订单' },
    ]},
    { name:'安全环保', open:false, children:[
      { name:'安全生产' },
      { name:'环境监测' },
    ]},
  ]}
];

function buildCommonCatTree(containerId, treeData) {
  var container = document.getElementById(containerId);
  if (!container) return;
  var data = treeData || _commonCatTree;
  container.innerHTML = _buildCommonTreeNodes(data, 0);
  var first = container.querySelector('.ltree-label');
  if (first) first.classList.add('active');
}

function _buildCommonTreeNodes(nodes, depth) {
  var html = '';
  for (var i = 0; i < nodes.length; i++) {
    var n = nodes[i];
    var hasChildren = n.children && n.children.length > 0;
    var isOpen = n.open !== false && hasChildren;
    var pad = depth === 0 ? 8 : (depth * 18 + 8);
    html += '<div class="ltree-item">';
    html += '<div class="ltree-label" style="padding-left:' + pad + 'px;" onclick="selectCommonTreeNode(this)">';
    if (hasChildren) {
      html += '<i class="fa-solid ' + (isOpen ? 'fa-chevron-down' : 'fa-chevron-right') + ' ltree-arrow" onclick="event.stopPropagation();toggleCommonTree(this)"></i>';
    } else {
      html += '<span class="ltree-arrow-placeholder"></span>';
    }
    if (depth === 0 && n.name === '全部') {
      html += '<i class="fa-solid fa-folder cat-icon" style="color:#3370ff"></i>';
    } else if (hasChildren && isOpen) {
      html += '<i class="fa-regular fa-folder-open cat-icon"></i>';
    } else {
      html += '<i class="fa-regular fa-folder cat-icon"></i>';
    }
    html += '<span>' + n.name + '</span>';
    html += '</div>';
    if (hasChildren) {
      html += '<div class="ltree-children" style="' + (isOpen ? '' : 'display:none;') + '">';
      html += _buildCommonTreeNodes(n.children, depth + 1);
      html += '</div>';
    }
    html += '</div>';
  }
  return html;
}

function toggleCommonTree(arrowEl) {
  var label = arrowEl.closest('.ltree-label');
  var children = label.nextElementSibling;
  if (!children) return;
  var isOpen = children.style.display !== 'none';
  if (isOpen) {
    children.style.display = 'none';
    arrowEl.classList.remove('fa-chevron-down');
    arrowEl.classList.add('fa-chevron-right');
    var fi = label.querySelector('.cat-icon');
    if (fi) { fi.classList.remove('fa-folder-open'); fi.classList.add('fa-folder'); }
  } else {
    children.style.display = '';
    arrowEl.classList.remove('fa-chevron-right');
    arrowEl.classList.add('fa-chevron-down');
    var fi = label.querySelector('.cat-icon');
    if (fi) { fi.classList.remove('fa-folder'); fi.classList.add('fa-folder-open'); }
  }
}

function selectCommonTreeNode(labelEl) {
  var tree = labelEl.closest('.category-tree');
  tree.querySelectorAll('.ltree-label').forEach(function(l) { l.classList.remove('active'); });
  labelEl.classList.add('active');
}

function buildCommonCatDropdownTree(containerId) {
  var container = document.getElementById(containerId);
  if (!container) return;
  container.innerHTML = _buildDropdownTreeNodes(_commonCatTree[0].children, 0);
}

function _buildDropdownTreeNodes(nodes, depth) {
  var html = '';
  var pad = 12 + depth * 20;
  for (var i = 0; i < nodes.length; i++) {
    var n = nodes[i];
    var hasChildren = n.children && n.children.length > 0;
    html += '<div class="cat-tree-node" style="padding:5px ' + 12 + 'px 5px ' + pad + 'px;cursor:pointer;display:flex;align-items:center;gap:6px;" onclick="event.stopPropagation();selectCatTreeNode(this,\'' + n.name + '\')">';
    html += '<i class="fa-solid fa-folder" style="color:#f5a623;font-size:13px;"></i><span style="font-size:13px;color:#333;">' + n.name + '</span>';
    html += '</div>';
    if (hasChildren) {
      html += _buildDropdownTreeNodes(n.children, depth + 1);
    }
  }
  return html;
}

// 更多操作下拉
function toggleMoreMenu(el) {
  const allMenus = document.querySelectorAll('.more-actions.open');
  allMenus.forEach(m => { if (m !== el) m.classList.remove('open'); });
  el.classList.toggle('open');
}

document.addEventListener('click', (e) => {
  if (!e.target.closest('.more-actions')) {
    document.querySelectorAll('.more-actions.open').forEach(m => m.classList.remove('open'));
  }
});

// 事实表/数据集下拉菜单
function toggleFactNewMenu(btn) {
  const menu = btn.nextElementSibling;
  menu.style.display = menu.style.display === 'none' ? 'block' : 'none';
  const close = (e) => {
    if (!btn.parentElement.contains(e.target)) { menu.style.display = 'none'; document.removeEventListener('click', close); }
  };
  setTimeout(() => document.addEventListener('click', close), 0);
}

// 根据页面名称激活对应菜单项
function activateMenuByPage(pageName) {
  document.querySelectorAll('.sub-group-menu li, .sub-menu > li:not(.sub-group)').forEach(li => li.classList.remove('active'));
  const links = document.querySelectorAll('.sub-group-menu li a, .sub-menu > li:not(.sub-group) a');
  links.forEach(a => {
    if (a.getAttribute('onclick') && a.getAttribute('onclick').includes("'" + pageName + "'")) {
      a.closest('li').classList.add('active');
      const subGroupMenu = a.closest('.sub-group-menu');
      if (subGroupMenu) {
        subGroupMenu.classList.add('open');
        const header = subGroupMenu.previousElementSibling;
        if (header) header.classList.add('expanded');
      }
    }
  });
}

// 初始化
document.addEventListener('DOMContentLoaded', () => {
  document.querySelectorAll('.menu-item:not(.active-module) .sub-menu').forEach(sub => {
    sub.classList.remove('open');
  });

  const hash = location.hash.replace('#','');
  if (hash === 'dataset-form') {
    setTimeout(() => openDatasetForm(), 50);
  } else if (hash === 'dataset-fields') {
    setTimeout(() => { openDatasetForm(); setTimeout(() => renderDsFieldsTab(), 100); }, 50);
  } else if (hash === 'dashboard-editor') {
    setTimeout(() => openDashboardEditor(), 50);
  } else if (hash === 'insight-editor') {
    setTimeout(() => openInsightEditor(), 50);
  } else if (hash && pageConfig[hash]) {
    loadPage(hash);
    activateMenuByPage(hash);
  } else {
    loadPage('indicator-ledger');
  }
});

// ============ 通用删除确认弹窗 ============
function confirmDelete(name) {
  var overlay = document.createElement('div');
  overlay.id = 'confirm-delete-overlay';
  overlay.className = 'modal-overlay';

  var modal = document.createElement('div');
  modal.className = 'modal';
  modal.style.cssText = 'width:420px;display:flex;flex-direction:column;overflow:hidden;';
  modal.innerHTML =
    '<div class="modal-header">' +
      '<span class="modal-title">确认删除</span>' +
      '<span class="modal-close" onclick="closeConfirmDelete()">&times;</span>' +
    '</div>' +
    '<div style="padding:24px 28px;font-size:14px;color:#333;line-height:1.8;">' +
      '<i class="fa-solid fa-triangle-exclamation" style="color:#ff7d00;margin-right:8px;font-size:16px;"></i>' +
      '您确定要删除【<b>' + name + '</b>】吗？' +
    '</div>' +
    '<div style="display:flex;justify-content:flex-end;gap:8px;padding:14px 28px;border-top:1px solid #f0f0f0;">' +
      '<button class="btn btn-sm" onclick="closeConfirmDelete()">取 消</button>' +
      '<button class="btn btn-primary btn-sm" style="background:#f53f3f;border-color:#f53f3f;" onclick="closeConfirmDelete()">确 定</button>' +
    '</div>';

  overlay.appendChild(modal);
  document.body.appendChild(overlay);
}

function confirmBatchDelete(count) {
  var overlay = document.createElement('div');
  overlay.id = 'confirm-delete-overlay';
  overlay.className = 'modal-overlay';

  var modal = document.createElement('div');
  modal.className = 'modal';
  modal.style.cssText = 'width:420px;display:flex;flex-direction:column;overflow:hidden;';
  modal.innerHTML =
    '<div class="modal-header">' +
      '<span class="modal-title">确认删除</span>' +
      '<span class="modal-close" onclick="closeConfirmDelete()">&times;</span>' +
    '</div>' +
    '<div style="padding:24px 28px;font-size:14px;color:#333;line-height:1.8;">' +
      '<i class="fa-solid fa-triangle-exclamation" style="color:#ff7d00;margin-right:8px;font-size:16px;"></i>' +
      '您确定要删除所选的 <b>' + (count || 0) + '</b> 条记录吗？' +
    '</div>' +
    '<div style="display:flex;justify-content:flex-end;gap:8px;padding:14px 28px;border-top:1px solid #f0f0f0;">' +
      '<button class="btn btn-sm" onclick="closeConfirmDelete()">取 消</button>' +
      '<button class="btn btn-primary btn-sm" style="background:#f53f3f;border-color:#f53f3f;" onclick="closeConfirmDelete()">确 定</button>' +
    '</div>';

  overlay.appendChild(modal);
  document.body.appendChild(overlay);
}

function closeConfirmDelete() {
  var el = document.getElementById('confirm-delete-overlay');
  if (el) el.remove();
}

function confirmAction(action, target) {
  var overlay = document.createElement('div');
  overlay.id = 'confirm-action-overlay';
  overlay.className = 'modal-overlay';

  var iconColor = action === '清除数据' ? '#ff7d00' : '#3370ff';
  var btnColor = action === '清除数据' ? '#ff7d00' : '#3370ff';

  var modal = document.createElement('div');
  modal.className = 'modal';
  modal.style.cssText = 'width:420px;display:flex;flex-direction:column;overflow:hidden;';
  modal.innerHTML =
    '<div class="modal-header">' +
      '<span class="modal-title">确认操作</span>' +
      '<span class="modal-close" onclick="closeConfirmAction()">&times;</span>' +
    '</div>' +
    '<div style="padding:24px 28px;font-size:14px;color:#333;line-height:1.8;">' +
      '<i class="fa-solid fa-triangle-exclamation" style="color:' + iconColor + ';margin-right:8px;font-size:16px;"></i>' +
      '您确定要' + action + '【<b>' + target + '</b>】吗？' +
    '</div>' +
    '<div style="display:flex;justify-content:flex-end;gap:8px;padding:14px 28px;border-top:1px solid #f0f0f0;">' +
      '<button class="btn btn-sm" onclick="closeConfirmAction()">取 消</button>' +
      '<button class="btn btn-primary btn-sm" style="background:' + btnColor + ';border-color:' + btnColor + ';" onclick="closeConfirmAction()">确 定</button>' +
    '</div>';

  overlay.appendChild(modal);
  document.body.appendChild(overlay);
}

function confirmBatchAction(action, count) {
  var overlay = document.createElement('div');
  overlay.id = 'confirm-action-overlay';
  overlay.className = 'modal-overlay';

  var iconColor = action === '清除数据' ? '#ff7d00' : '#3370ff';
  var btnColor = action === '清除数据' ? '#ff7d00' : '#3370ff';

  var modal = document.createElement('div');
  modal.className = 'modal';
  modal.style.cssText = 'width:420px;display:flex;flex-direction:column;overflow:hidden;';
  modal.innerHTML =
    '<div class="modal-header">' +
      '<span class="modal-title">确认操作</span>' +
      '<span class="modal-close" onclick="closeConfirmAction()">&times;</span>' +
    '</div>' +
    '<div style="padding:24px 28px;font-size:14px;color:#333;line-height:1.8;">' +
      '<i class="fa-solid fa-triangle-exclamation" style="color:' + iconColor + ';margin-right:8px;font-size:16px;"></i>' +
      '您确定要' + action + '所选的 <b>' + (count || 0) + '</b> 条记录吗？' +
    '</div>' +
    '<div style="display:flex;justify-content:flex-end;gap:8px;padding:14px 28px;border-top:1px solid #f0f0f0;">' +
      '<button class="btn btn-sm" onclick="closeConfirmAction()">取 消</button>' +
      '<button class="btn btn-primary btn-sm" style="background:' + btnColor + ';border-color:' + btnColor + ';" onclick="closeConfirmAction()">确 定</button>' +
    '</div>';

  overlay.appendChild(modal);
  document.body.appendChild(overlay);
}

function closeConfirmAction() {
  var el = document.getElementById('confirm-action-overlay');
  if (el) el.remove();
}
