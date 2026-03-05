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

// 子菜单项激活切换
function setActiveSubMenu(el) {
  document.querySelectorAll('.sub-menu li').forEach(li => li.classList.remove('active'));
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
  'indicator-model': { title: '指标模型', icon: 'fa-solid fa-diagram-project', desc: '设计和维护指标计算模型与派生关系' },
  'time-period':     { title: '时间周期', icon: 'fa-regular fa-clock', desc: '配置指标的统计时间周期与粒度' },
  'fact-table':      { title: '事实表', icon: 'fa-solid fa-scroll', desc: '管理底层事实数据表及其映射关系' },
  'indicator-audit': { title: '指标审核', icon: 'fa-solid fa-list-check', desc: '审核指标定义变更与发布申请' },
  // 数据管理
  'query-widget':    { title: '查询控件', icon: 'fa-solid fa-magnifying-glass', desc: '管理和配置数据查询控件' },
  'dataset':         { title: '数据集', icon: 'fa-solid fa-server', desc: '管理和配置数据集资源' },
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
    'indicator-mgmt': renderIndicatorMgmt,
    'dimension-mgmt': renderDimensionMgmt,
    'summary-table': renderSummaryTable,
    'indicator-model': renderIndicatorModel,
    'time-period': renderTimePeriod,
    'fact-table': renderFactTable,
    'indicator-audit': renderIndicatorAudit,
    'dataset': renderDataset,
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

// 初始化
document.addEventListener('DOMContentLoaded', () => {
  const hash = location.hash.replace('#','');
  if (hash === 'dataset-form') {
    setTimeout(() => openDatasetForm(), 50);
  } else if (hash === 'dataset-fields') {
    setTimeout(() => { openDatasetForm(); setTimeout(() => renderDsFieldsTab(), 100); }, 50);
  } else if (hash && pageConfig[hash]) {
    loadPage(hash);
  } else {
    loadPage('indicator-mgmt');
  }
});
