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
    loadPage('indicator-mgmt');
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
