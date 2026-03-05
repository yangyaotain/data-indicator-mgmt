/**
 * 数据指标管理模块 - 前端交互逻辑
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
  const submenu = el.closest('.sub-menu');
  if (!submenu) return;
  submenu.querySelectorAll('li').forEach(li => li.classList.remove('active'));
  el.closest('li').classList.add('active');
}

// 页面路由映射
const pageConfig = {
  'indicator-mgmt': { title: '指标管理', icon: 'fa-solid fa-chart-line', desc: '管理和维护数据指标定义、分类与配置' },
  'dimension-mgmt': { title: '维度管理', icon: 'fa-solid fa-table-cells', desc: '管理指标的分析维度与维度属性' },
  'summary-table':  { title: '汇总表', icon: 'fa-solid fa-arrows-spin', desc: '查看和管理指标汇总数据表' },
  'indicator-model':{ title: '指标模型', icon: 'fa-solid fa-diagram-project', desc: '设计和维护指标计算模型与派生关系' },
  'time-period':    { title: '时间周期', icon: 'fa-regular fa-clock', desc: '配置指标的统计时间周期与粒度' },
  'fact-table':     { title: '事实表', icon: 'fa-solid fa-cube', desc: '管理底层事实数据表及其映射关系' },
  'indicator-audit': { title: '指标审核', icon: 'fa-solid fa-list-check', desc: '审核指标定义变更与发布申请' },
  'dataset':         { title: '数据集', icon: 'fa-solid fa-database', desc: '管理和配置数据集资源' },
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

  // 各页面专属渲染函数
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

// 通用占位页面
function renderDefaultPage(container, config) {
  container.innerHTML = `
    <div class="placeholder-content">
      <div class="placeholder-icon"><i class="${config.icon}"></i></div>
      <h2>${config.title}</h2>
      <p>${config.desc}</p>
      <p class="placeholder-hint">页面内容将根据需求补充</p>
    </div>`;
}

// ============ 指标管理页面 ============
function renderIndicatorMgmt(container, config) {
  container.innerHTML = `
    <div class="split-layout">
      <!-- 左侧分类树 -->
      <div class="split-left">
        <div class="split-left-header">
          <i class="fa-solid fa-list"></i>
          <span>指标管理分类</span>
          <div style="flex:1"></div>
          <i class="fa-solid fa-arrows-alt split-toggle" title="收起/展开"></i>
        </div>
        <div class="split-left-search">
          <div class="search-box" style="width:100%">
            <i class="fa-solid fa-magnifying-glass"></i>
            <input type="text" placeholder="搜索" style="width:100%">
          </div>
        </div>
        <div class="category-tree">
          <div class="cat-node selected" onclick="selectCatNode(this)">
            <i class="fa-solid fa-folder cat-icon" style="color:#3370ff"></i>
            <span>全部</span>
          </div>
          <div class="cat-node" onclick="selectCatNode(this)">
            <i class="fa-solid fa-chevron-right cat-expand"></i>
            <i class="fa-regular fa-folder cat-icon"></i>
            <span>财务数据指标</span>
          </div>
          <div class="cat-node" onclick="selectCatNode(this)">
            <i class="fa-solid fa-chevron-down cat-expand"></i>
            <i class="fa-regular fa-folder-open cat-icon"></i>
            <span>指标体系</span>
          </div>
          <div class="cat-node cat-child" onclick="selectCatNode(this)">
            <i class="fa-regular fa-folder cat-icon"></i>
            <span>免审</span>
          </div>
        </div>
      </div>
      <!-- 右侧内容 -->
      <div class="split-right">
        <!-- Tab栏 -->
        <div class="ind-tab-bar">
          <div class="ind-tab active"><i class="fa-regular fa-circle" style="color:#3370ff; margin-right:4px; font-size:12px"></i> 全部</div>
        </div>
        <!-- 工具栏 -->
        <div class="ind-toolbar">
          <button class="btn btn-primary btn-sm" onclick="openIndicatorForm('new')"><i class="fa-solid fa-plus"></i> 新增指标</button>
          <button class="btn btn-sm" onclick="openBatchCreatePage()"><i class="fa-solid fa-plus"></i> 批量新增指标</button>
          <button class="btn btn-sm"><i class="fa-solid fa-download"></i> 导入</button>
          <button class="btn btn-sm"><i class="fa-solid fa-upload"></i> 导出</button>
          <button class="btn btn-sm"><i class="fa-solid fa-file-import"></i> 数据导入</button>
          <button class="btn btn-sm"><i class="fa-solid fa-file-export"></i> 数据导出</button>
          <button class="btn btn-sm"><i class="fa-solid fa-arrow-up"></i> 上线</button>
          <button class="btn btn-sm"><i class="fa-solid fa-arrow-down"></i> 下线</button>
          <button class="btn btn-sm" style="color:#f53f3f; border-color:#f53f3f"><i class="fa-regular fa-trash-can"></i> 删除</button>
        </div>
        <!-- 筛选行 -->
        <div class="ind-filter-row">
          <label class="filter-label">上线状态</label>
          <div class="select-box select-sm">请选择上线状态 <i class="fa-solid fa-chevron-down"></i></div>
          <label class="filter-label">指标类型</label>
          <div class="select-box select-sm">请选择指标类型 <i class="fa-solid fa-chevron-down"></i></div>
          <label class="filter-label">审核状态</label>
          <div class="select-box select-sm">请选择审核状态 <i class="fa-solid fa-chevron-down"></i></div>
          <label class="filter-label">锁定状态</label>
          <div class="select-box select-sm">请选择锁定状态 <i class="fa-solid fa-chevron-down"></i></div>
          <label class="filter-label">指标名称</label>
          <div class="search-box search-sm">
            <i class="fa-solid fa-magnifying-glass"></i>
            <input type="text" placeholder="请输入关键字">
          </div>
          <button class="btn btn-primary btn-sm">查询</button>
          <button class="btn btn-sm">重置</button>
        </div>
        <!-- 表格 -->
        <div class="ind-table-wrap">
          <table class="data-table">
            <thead>
              <tr>
                <th style="width:36px"><input type="checkbox"></th>
                <th>指标分类</th>
                <th>指标编码</th>
                <th>指标名称</th>
                <th>指标类型</th>
                <th>锁定状态</th>
                <th>上线状态</th>
                <th>审核状态</th>
                <th>版本</th>
                <th>操作</th>
              </tr>
            </thead>
            <tbody>
              ${generateIndicatorRows()}
            </tbody>
          </table>
          <div class="pagination">
            <span class="page-info">总共 15 条数据</span>
            <div class="page-btn"><i class="fa-solid fa-chevron-left"></i></div>
            <div class="page-btn active">1</div>
            <div class="page-btn"><i class="fa-solid fa-chevron-right"></i></div>
            <span class="page-info" style="margin-left:8px">20 条/页</span>
          </div>
        </div>
      </div>
    </div>`;
}

function generateIndicatorRows() {
  const data = [
    { cat: '指标体系/免审', code: '000021', name: '日完成占比', type: '衍生指标', lock: '已锁定', online: '已上线', audit: '—', ver: 'V1' },
    { cat: '指标体系/免审', code: '000020', name: '创建生产订单', type: '派生指标', lock: '已锁定', online: '已上线', audit: '—', ver: 'V1' },
    { cat: '指标体系/免审', code: '000019', name: '日完成生产订单', type: '派生指标', lock: '已锁定', online: '已上线', audit: '—', ver: 'V1' },
    { cat: '指标体系/免审', code: '000018', name: '生产订单', type: '原子指标', lock: '已锁定', online: '已上线', audit: '—', ver: 'V2' },
    { cat: '财务数据指标', code: '000017', name: '营业收入', type: '原子指标', lock: '已锁定', online: '未上线', audit: '—', ver: 'V1' },
    { cat: '指标体系', code: '000012', name: '关闭生产订单数量', type: '派生指标', lock: '已锁定', online: '未上线', audit: '—', ver: 'V1' },
    { cat: '指标体系', code: '000013', name: '取消生产订单数量', type: '派生指标', lock: '已锁定', online: '已上线', audit: '—', ver: 'V1' },
    { cat: '指标体系', code: '000010', name: '周完成生产订单总数', type: '派生指标', lock: '已锁定', online: '已上线', audit: '—', ver: 'V1' },
    { cat: '指标体系', code: '000011', name: '日完成生产订单总数', type: '派生指标', lock: '已锁定', online: '已上线', audit: '上线审核通过', ver: 'V1' },
    { cat: '指标体系', code: '000009', name: '生产订单总数', type: '派生指标', lock: '已锁定', online: '已上线', audit: '上线审核通过', ver: 'V1' },
    { cat: '指标体系', code: '000006', name: '周计划完成率', type: '衍生指标', lock: '已锁定', online: '已上线', audit: '—', ver: 'V1' },
    { cat: '指标体系', code: '000005', name: '日计划完成率', type: '衍生指标', lock: '已锁定', online: '已上线', audit: '上线审核通过', ver: 'V1' },
    { cat: '指标体系', code: '000004', name: '日完成生产订单数量', type: '派生指标', lock: '已锁定', online: '已上线', audit: '—', ver: 'V1' },
    { cat: '指标体系', code: '000003', name: '周完成生产订单数量', type: '派生指标', lock: '已锁定', online: '已上线', audit: '—', ver: 'V1' },
  ];

  return data.map(row => {
    const typeClass = row.type === '原子指标' ? 'badge-blue' : row.type === '派生指标' ? 'badge-green' : 'badge-orange';
    const lockBadge = row.lock === '已锁定' ? '<span class="badge badge-blue">已锁定</span>' : '<span class="badge badge-gray">未锁定</span>';
    const onlineBadge = row.online === '已上线' ? '<span class="badge badge-green">已上线</span>' : '<span class="badge badge-gray">未上线</span>';
    const auditText = row.audit === '—' ? '—' : `<span class="badge badge-green">${row.audit}</span>`;
    let bindFn = 'openDataBindingPage()';
    if (row.type === '派生指标') bindFn = 'openDerivedBindingPage()';
    else if (row.type === '衍生指标') bindFn = 'openComputedBindingPage()';

    return `
      <tr>
        <td><input type="checkbox"></td>
        <td>${row.cat}</td>
        <td>${row.code}</td>
        <td><a class="action-link" onclick="openVersionPage('${row.name}')">${row.name}</a></td>
        <td><span class="badge ${typeClass}">${row.type}</span></td>
        <td>${lockBadge}</td>
        <td>${onlineBadge}</td>
        <td>${auditText}</td>
        <td>${row.ver}</td>
        <td class="op-cell">
          <a class="action-link" onclick="openIndicatorForm('edit')">编辑</a>
          <a class="action-link" onclick="${bindFn}">数据绑定</a>
          <a class="action-link" style="color:#f53f3f">删除</a>
          <span class="more-actions" onclick="toggleMoreMenu(this)">···
            <div class="more-menu">
              <a onclick="openVersionPage('${row.name}')">版本管理</a>
              <a onclick="openRelationGraph()">指标关系图</a>
            </div>
          </span>
        </td>
      </tr>`;
  }).join('');
}

function selectCatNode(el) {
  el.closest('.category-tree').querySelectorAll('.cat-node').forEach(n => n.classList.remove('selected'));
  el.classList.add('selected');
}

// ============ 指标新建/编辑页面 ============
function openIndicatorForm(mode, data) {
  const contentArea = document.getElementById('content-area');
  const isEdit = mode === 'edit';
  const defaults = data || {
    category: '免审',
    code: isEdit ? '000021' : '',
    name: isEdit ? '日完成占比' : '',
    type: isEdit ? '衍生指标' : '',
    rangeMin: '',
    rangeMax: '',
    unit: isEdit ? '%' : '',
    precision: isEdit ? '3' : '',
    desc: '',
    formula: '',
    version: 'V1'
  };

  const h = (icon) => `<i class="fa-regular fa-circle-question help-icon"></i>`;

  contentArea.innerHTML = `
    <div class="edit-page">
      <div class="edit-page-header">
        <span class="edit-page-title">${isEdit ? '编辑指标' : '新建指标'}${isEdit ? '(指标版本：' + defaults.version + ')' : ''}</span>
        <div class="edit-page-actions">
          <button class="btn btn-sm" onclick="loadPage('indicator-mgmt')">返回</button>
          <button class="btn btn-primary btn-sm">保存</button>
        </div>
      </div>
      <div class="edit-page-body">
        <div class="form-grid">
          <!-- Row 1: 所属分类 | 指标编码 -->
          <div class="form-row">
            <div class="form-cell">
              <div class="form-group">
                <label class="form-label required">所属分类</label>
                <div class="form-field">
                  <select class="form-control form-select">
                    <option ${defaults.category === '免审' ? 'selected' : ''}>免审</option>
                    <option>指标体系</option>
                    <option>财务数据指标</option>
                  </select>
                  ${h()}
                </div>
              </div>
            </div>
            <div class="form-cell">
              <div class="form-group">
                <label class="form-label">指标编码</label>
                <div class="form-field">
                  <input type="text" class="form-control" value="${defaults.code}" placeholder="${isEdit ? '' : '系统自动生成'}" ${isEdit ? 'readonly style="background:#fff7e8; color:#ff7d00"' : 'readonly style="background:#f7f8fa"'}>
                  ${h()}
                </div>
              </div>
            </div>
          </div>
          <!-- Row 2: 指标名称 | 指标类型 -->
          <div class="form-row">
            <div class="form-cell">
              <div class="form-group">
                <label class="form-label required">指标名称</label>
                <div class="form-field">
                  <input type="text" class="form-control" value="${defaults.name}" placeholder="请输入">
                  ${h()}
                </div>
              </div>
            </div>
            <div class="form-cell">
              <div class="form-group">
                <label class="form-label required">指标类型</label>
                <div class="form-field">
                  <select class="form-control form-select" ${isEdit ? 'style="background:#fff7e8; color:#ff7d00"' : ''}>
                    <option value="">请选择</option>
                    <option ${defaults.type === '原子指标' ? 'selected' : ''}>原子指标</option>
                    <option ${defaults.type === '派生指标' ? 'selected' : ''}>派生指标</option>
                    <option ${defaults.type === '衍生指标' ? 'selected' : ''}>衍生指标</option>
                  </select>
                  ${h()}
                </div>
              </div>
            </div>
          </div>
          <!-- Row 3: 数据范围 | 单位 -->
          <div class="form-row">
            <div class="form-cell">
              <div class="form-group">
                <label class="form-label">数据范围</label>
                <div class="form-field">
                  <input type="text" class="form-control form-control-range" value="${defaults.rangeMin}" placeholder="请输入">
                  <span class="range-sep">—</span>
                  <input type="text" class="form-control form-control-range" value="${defaults.rangeMax}" placeholder="请输入">
                  ${h()}
                </div>
              </div>
            </div>
            <div class="form-cell">
              <div class="form-group">
                <label class="form-label">单位</label>
                <div class="form-field">
                  <input type="text" class="form-control" value="${defaults.unit}" placeholder="请输入">
                  ${h()}
                </div>
              </div>
            </div>
          </div>
          <!-- Row 4: 精度 | 描述 -->
          <div class="form-row">
            <div class="form-cell">
              <div class="form-group">
                <label class="form-label">精度</label>
                <div class="form-field">
                  <input type="text" class="form-control" value="${defaults.precision}" placeholder="请输入">
                  ${h()}
                </div>
              </div>
            </div>
            <div class="form-cell">
              <div class="form-group">
                <label class="form-label">描述</label>
                <div class="form-field">
                  <textarea class="form-control" placeholder="请输入" rows="3">${defaults.desc}</textarea>
                  ${h()}
                </div>
              </div>
            </div>
          </div>
          <!-- Row 5: 计算公式 | (空) -->
          <div class="form-row">
            <div class="form-cell">
              <div class="form-group">
                <label class="form-label">计算公式</label>
                <div class="form-field">
                  <textarea class="form-control" placeholder="请输入" rows="3">${defaults.formula}</textarea>
                  ${h()}
                </div>
              </div>
            </div>
            <div class="form-cell"></div>
          </div>
        </div>
      </div>
    </div>`;
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

// ============ 汇总表页面 ============
function renderSummaryTable(container, config) {
  container.innerHTML = `
    <div class="split-layout">
      <div class="split-left">
        <div class="split-left-header">
          <span><i class="fa-solid fa-bars" style="margin-right:6px"></i>汇总表分类</span>
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
            <i class="fa-regular fa-folder" style="color:#f90"></i> 指标体系
          </div>
        </div>
      </div>
      <div class="split-right">
        <div class="ind-tab-bar">
          <div class="ind-tab active"><i class="fa-regular fa-folder" style="color:#f90; margin-right:4px; font-size:12px"></i> 全部</div>
        </div>
        <div class="ind-toolbar">
          <button class="btn btn-primary btn-sm" onclick="openSummaryForm()">新建</button>
          <button class="btn btn-sm" style="background:#3370ff; color:#fff; border-color:#3370ff">启动</button>
          <button class="btn btn-sm" style="background:#3370ff; color:#fff; border-color:#3370ff">停止</button>
          <button class="btn btn-sm" style="background:#ff7d00; color:#fff; border-color:#ff7d00">清除数据</button>
          <button class="btn btn-sm" style="background:#f53f3f; color:#fff; border-color:#f53f3f">删除</button>
          <div style="flex:1"></div>
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
                <th>任务名称</th>
                <th>表英文名</th>
                <th>别名</th>
                <th>归属</th>
                <th>数据周期</th>
                <th>状态</th>
                <th>最后执行状态</th>
                <th>描述</th>
                <th>操作</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td><input type="checkbox"></td>
                <td>hui1</td>
                <td>新建指标测算1</td>
                <td>daily_cmp_order</td>
                <td>日完成情况汇总</td>
                <td>输出业务层/test_dm</td>
                <td>日</td>
                <td><span class="badge badge-green">启动</span></td>
                <td><span class="badge badge-blue">执行成功</span></td>
                <td></td>
                <td class="op-cell">
                  <a class="action-link" style="color:#ff7d00">停止</a>
                  <a class="action-link">立即执行</a>
                  <a class="action-link" onclick="openSummaryForm()">编辑</a>
                  <span class="more-actions" onclick="toggleMoreMenu(this)">
                    <i class="fa-solid fa-ellipsis-vertical" style="font-size:14px"></i>
                    <div class="more-menu">
                      <a>查信息</a>
                      <a>数据预览</a>
                      <a>查看调度</a>
                      <a style="color:#ff7d00">清除数据</a>
                      <a style="color:#f53f3f">删除</a>
                    </div>
                  </span>
                </td>
              </tr>
            </tbody>
          </table>
          <div class="pagination">
            <span class="page-info">总共 1 条数据</span>
            <div class="page-btn"><i class="fa-solid fa-chevron-left"></i></div>
            <div class="page-btn active">1</div>
            <div class="page-btn"><i class="fa-solid fa-chevron-right"></i></div>
            <span class="page-info" style="margin-left:8px">20 条/页</span>
          </div>
        </div>
      </div>
    </div>`;
}

// ============ 汇总表新建/编辑页面 ============
function openSummaryForm() {
  const contentArea = document.getElementById('content-area');
  contentArea.innerHTML = `
    <div class="edit-page" style="display:flex; flex-direction:column; height:100%">
      <div class="summary-tabs">
        <div class="summary-tab active" onclick="switchSummaryTab(this,'data')">数据信息</div>
        <div class="summary-tab" onclick="switchSummaryTab(this,'table')">表信息</div>
        <div class="summary-tab" onclick="switchSummaryTab(this,'schedule')">调度信息</div>
        <div style="flex:1"></div>
        <button class="btn btn-sm" onclick="loadPage('summary-table')">返 回</button>
      </div>
      <div id="summary-tab-content" style="flex:1; overflow-y:auto"></div>
    </div>`;
  renderSummaryDataTab();
}

function switchSummaryTab(el, tab) {
  el.parentElement.querySelectorAll('.summary-tab').forEach(t => t.classList.remove('active'));
  el.classList.add('active');
  if (tab === 'data') renderSummaryDataTab();
  else if (tab === 'table') renderSummaryTableTab();
  else if (tab === 'schedule') renderSummaryScheduleTab();
}

function renderSummaryDataTab() {
  document.getElementById('summary-tab-content').innerHTML = `
    <div style="display:flex; height:100%; min-height:480px">
      <div class="summary-data-left">
        <div class="summary-ind-list">
          <div class="summary-ind-item"><span class="summary-ind-num">1</span> 生产订单总数</div>
          <div class="summary-ind-item"><span class="summary-ind-num">2</span> 日计划完成率</div>
          <div class="summary-ind-item"><span class="summary-ind-num">3</span> 日完成生产订单总数</div>
          <div class="summary-ind-item"><span class="summary-ind-num" style="background:var(--primary-color); color:#fff">4</span> <a class="action-link">指标</a></div>
        </div>
        <div class="summary-config-section">
          <div class="summary-config-label">汇总表维度：<i class="fa-solid fa-plus" style="color:var(--primary-color); cursor:pointer; font-size:12px; margin-left:4px"></i></div>
        </div>
        <div class="summary-config-section">
          <a class="action-link" style="font-size:13px"><i class="fa-solid fa-plus" style="margin-right:4px"></i>排序规则</a>
        </div>
        <div class="summary-config-section">
          <div class="dim-form-row" style="margin-bottom:10px">
            <label class="dim-form-label" style="width:80px; font-size:13px">执行机制：</label>
            <div class="dim-form-field" style="display:flex; gap:6px; align-items:center">
              <select class="form-control form-select" style="width:70px">
                <option>每天</option><option>每周</option><option>每月</option>
              </select>
              <input type="text" class="form-control" value="18:20:00" style="width:90px; font-size:13px">
              <i class="fa-regular fa-clock" style="color:var(--text-tertiary)"></i>
            </div>
          </div>
          <div style="font-size:13px; color:var(--text-secondary); margin-bottom:6px; padding-left:80px">数据时间范围：</div>
          <div class="dim-form-row" style="margin-bottom:8px">
            <label class="dim-form-label" style="width:80px; font-size:13px">开始时间</label>
            <div class="dim-form-field" style="display:flex; gap:6px; align-items:center">
              <select class="form-control form-select" style="width:70px"><option>昨天</option><option>今天</option></select>
              <input type="text" class="form-control" value="00:00:00" style="width:90px; font-size:13px">
              <i class="fa-regular fa-clock" style="color:var(--text-tertiary)"></i>
            </div>
          </div>
          <div class="dim-form-row" style="margin-bottom:8px">
            <label class="dim-form-label" style="width:80px; font-size:13px">结束时间</label>
            <div class="dim-form-field" style="display:flex; gap:6px; align-items:center">
              <select class="form-control form-select" style="width:70px"><option>当天</option><option>昨天</option></select>
              <input type="text" class="form-control" value="00:00:00" style="width:90px; font-size:13px">
              <i class="fa-regular fa-clock" style="color:var(--text-tertiary)"></i>
            </div>
          </div>
          <div class="dim-form-row" style="margin-bottom:12px">
            <label class="dim-form-label" style="width:80px; font-size:13px">首次补录时间：</label>
            <div class="dim-form-field" style="display:flex; gap:6px; align-items:center">
              <input type="text" class="form-control" value="2022-01-01 00:00:00" style="width:180px; font-size:13px">
              <i class="fa-regular fa-calendar" style="color:var(--text-tertiary)"></i>
              <i class="fa-regular fa-clock" style="color:var(--text-tertiary)"></i>
            </div>
          </div>
        </div>
        <div style="padding:16px; display:flex; gap:8px">
          <button class="btn btn-primary btn-sm">下一步</button>
          <button class="btn btn-primary btn-sm">保存</button>
        </div>
      </div>
      <div class="summary-data-right">
        <div style="display:flex; align-items:center; justify-content:space-between; padding:16px 20px; border-bottom:1px solid var(--border-color)">
          <span style="font-size:14px; font-weight:500">新建指标测算1 <i class="fa-regular fa-pen-to-square" style="color:var(--text-tertiary); margin-left:6px; cursor:pointer"></i></span>
          <div style="display:flex; gap:16px; font-size:13px">
            <a class="action-link"><i class="fa-regular fa-eye" style="margin-right:4px"></i>cql预览</a>
            <a class="action-link"><i class="fa-solid fa-download" style="margin-right:4px"></i>下载</a>
          </div>
        </div>
        <div style="padding:0; overflow:auto; flex:1">
          <table class="data-table">
            <thead>
              <tr>
                <th>时间列</th>
                <th>生产订单总数</th>
                <th>日计划完成率</th>
                <th>日完成生产订单总数</th>
              </tr>
            </thead>
            <tbody>
              <tr><td>2026-03-04</td><td></td><td></td><td></td></tr>
            </tbody>
          </table>
          <div class="pagination" style="padding:12px 16px">
            <span class="page-info">总共 1 条数据</span>
            <span class="page-btn active" style="margin-left:8px">1</span>
            <span class="page-size" style="margin-left:8px">10 条/页</span>
          </div>
        </div>
      </div>
    </div>`;
}

function renderSummaryTableTab() {
  document.getElementById('summary-tab-content').innerHTML = `
    <div style="padding:20px 24px; overflow-y:auto">
      <div class="dim-form-row" style="margin-bottom:16px">
        <label class="dim-form-label" style="width:80px">建表归制：</label>
        <div class="dim-form-field"><select class="form-control form-select" style="max-width:160px"><option>新建表</option><option>已有表</option></select></div>
      </div>
      <div class="section-title" style="margin-bottom:16px">基础信息</div>
      <div class="form-grid">
        <div class="form-row">
          <div class="form-cell">
            <div class="form-group"><label class="form-label required">数据源</label><div class="form-field"><select class="form-control form-select"><option>test_drm</option></select></div></div>
          </div>
          <div class="form-cell"></div>
        </div>
        <div class="form-row">
          <div class="form-cell">
            <div class="form-group"><label class="form-label required">编码</label><div class="form-field"><input type="text" class="form-control" value="hui1"></div></div>
          </div>
          <div class="form-cell">
            <div class="form-group"><label class="form-label required">表英文</label><div class="form-field"><input type="text" class="form-control" value="daily_cmp_order"></div></div>
          </div>
        </div>
        <div class="form-row">
          <div class="form-cell">
            <div class="form-group"><label class="form-label required">所属分类</label><div class="form-field"><select class="form-control form-select"><option>指标体系</option></select></div></div>
          </div>
          <div class="form-cell">
            <div class="form-group"><label class="form-label required">表别名</label><div class="form-field"><input type="text" class="form-control" value="日完成情况汇总"></div></div>
          </div>
        </div>
        <div class="form-row">
          <div class="form-cell" style="grid-column:1/-1">
            <div class="form-group"><label class="form-label">备注</label><div class="form-field"><textarea class="form-control" rows="2" placeholder="最大长度为1000个字符"></textarea></div></div>
          </div>
        </div>
      </div>

      <div style="overflow-x:auto; margin-top:20px">
        <table class="data-table" style="min-width:1100px; font-size:12px">
          <thead>
            <tr>
              <th style="width:40px">排序</th>
              <th>数据项</th>
              <th>英文</th>
              <th>别名</th>
              <th>数据类型</th>
              <th style="width:50px">长度</th>
              <th style="width:50px">精度</th>
              <th>缺省值</th>
              <th>属性</th>
              <th>描述</th>
              <th>操作</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td><i class="fa-solid fa-grip-vertical" style="color:#c9cdd4; cursor:grab"></i></td>
              <td><select class="form-control form-select" style="font-size:12px"><option>时间列</option></select></td>
              <td><input class="form-control" value="day" style="font-size:12px"></td>
              <td><input class="form-control" value="日期列" style="font-size:12px"></td>
              <td><select class="form-control form-select" style="font-size:12px"><option>date</option><option>int</option><option>double</option></select></td>
              <td><input class="form-control" value="" placeholder="数字" style="font-size:12px"></td>
              <td><input class="form-control" value="" placeholder="数字" style="font-size:12px"></td>
              <td><input class="form-control" placeholder="256个字符以内" style="font-size:12px"></td>
              <td style="white-space:nowrap"><label style="font-size:12px"><input type="checkbox" checked> 非空</label> <label style="font-size:12px"><input type="checkbox"> 主键</label> <label style="font-size:12px"><input type="checkbox"> 自增长</label></td>
              <td><input class="form-control" placeholder="200个字符以内" style="font-size:12px"></td>
              <td><a class="action-link" style="color:#f53f3f; font-size:12px">删除</a></td>
            </tr>
            <tr>
              <td><i class="fa-solid fa-grip-vertical" style="color:#c9cdd4; cursor:grab"></i></td>
              <td><select class="form-control form-select" style="font-size:12px"><option>生产订单总数</option></select></td>
              <td><input class="form-control" value="total_orders" style="font-size:12px"></td>
              <td><input class="form-control" value="订单总数" style="font-size:12px"></td>
              <td><select class="form-control form-select" style="font-size:12px"><option>int</option><option>double</option></select></td>
              <td><input class="form-control" value="" placeholder="数字" style="font-size:12px"></td>
              <td><input class="form-control" value="" placeholder="数字" style="font-size:12px"></td>
              <td><input class="form-control" placeholder="256个字符以内" style="font-size:12px"></td>
              <td style="white-space:nowrap"><label style="font-size:12px"><input type="checkbox"> 非空</label> <label style="font-size:12px"><input type="checkbox"> 主键</label> <label style="font-size:12px"><input type="checkbox"> 自增长</label></td>
              <td><input class="form-control" placeholder="200个字符以内" style="font-size:12px"></td>
              <td><a class="action-link" style="color:#f53f3f; font-size:12px">删除</a></td>
            </tr>
            <tr>
              <td><i class="fa-solid fa-grip-vertical" style="color:#c9cdd4; cursor:grab"></i></td>
              <td><select class="form-control form-select" style="font-size:12px"><option>日计划完成率</option></select></td>
              <td><input class="form-control" value="daily_cmp_orders" style="font-size:12px"></td>
              <td><input class="form-control" value="日订单数" style="font-size:12px"></td>
              <td><select class="form-control form-select" style="font-size:12px"><option>int</option></select></td>
              <td><input class="form-control" value="" placeholder="数字" style="font-size:12px"></td>
              <td><input class="form-control" value="" placeholder="数字" style="font-size:12px"></td>
              <td><input class="form-control" placeholder="256个字符以内" style="font-size:12px"></td>
              <td style="white-space:nowrap"><label style="font-size:12px"><input type="checkbox"> 非空</label> <label style="font-size:12px"><input type="checkbox"> 主键</label> <label style="font-size:12px"><input type="checkbox"> 自增长</label></td>
              <td><input class="form-control" placeholder="200个字符以内" style="font-size:12px"></td>
              <td><a class="action-link" style="color:#f53f3f; font-size:12px">删除</a></td>
            </tr>
            <tr>
              <td><i class="fa-solid fa-grip-vertical" style="color:#c9cdd4; cursor:grab"></i></td>
              <td><select class="form-control form-select" style="font-size:12px"><option>日完成生产订单总数</option></select></td>
              <td><input class="form-control" value="order_percent" style="font-size:12px"></td>
              <td><input class="form-control" value="日订单完成率" style="font-size:12px"></td>
              <td><select class="form-control form-select" style="font-size:12px"><option>double</option></select></td>
              <td><input class="form-control" value="" placeholder="数字" style="font-size:12px"></td>
              <td><input class="form-control" value="" placeholder="数字" style="font-size:12px"></td>
              <td><input class="form-control" placeholder="256个字符以内" style="font-size:12px"></td>
              <td style="white-space:nowrap"><label style="font-size:12px"><input type="checkbox"> 非空</label> <label style="font-size:12px"><input type="checkbox"> 主键</label> <label style="font-size:12px"><input type="checkbox"> 自增长</label></td>
              <td><input class="form-control" placeholder="200个字符以内" style="font-size:12px"></td>
              <td><a class="action-link" style="color:#f53f3f; font-size:12px">删除</a></td>
            </tr>
          </tbody>
        </table>
      </div>

      <div style="margin-top:20px">
        <a class="action-link" style="font-size:13px"><i class="fa-solid fa-gear" style="margin-right:4px"></i>高级配置</a>
      </div>
      <div style="margin-top:16px">
        <div class="dim-form-row" style="margin-bottom:12px; align-items:flex-start">
          <label class="dim-form-label" style="width:80px; font-size:13px">分区信息：</label>
          <div class="dim-form-field" style="display:flex; gap:8px; flex-wrap:wrap; align-items:flex-start">
            <select class="form-control form-select" style="width:100px; font-size:13px"><option>列表分区</option></select>
            <select class="form-control form-select" style="width:100px; font-size:13px"><option>选择字段</option></select>
            <select class="form-control form-select" style="width:100px; font-size:13px"><option>日期列</option></select>
          </div>
        </div>
        <div class="dim-form-row" style="margin-bottom:12px; align-items:flex-start; padding-left:80px">
          <textarea class="form-control" rows="3" placeholder="请输入分区对应配置信息" style="max-width:300px; font-size:13px"></textarea>
        </div>
        <div class="dim-form-row" style="margin-bottom:12px">
          <label class="dim-form-label" style="width:80px; font-size:13px">引擎：</label>
          <div class="dim-form-field"><select class="form-control form-select" style="width:120px; font-size:13px"><option>InnoDB</option><option>MyISAM</option></select></div>
        </div>
      </div>
      <div style="padding:16px 0; display:flex; gap:8px">
        <button class="btn btn-primary btn-sm">上一步</button>
        <button class="btn btn-primary btn-sm">保存</button>
      </div>
    </div>`;
}

function renderSummaryScheduleTab() {
  const scheduleData = [
    { start: '2026-03-03 18:20:01', end: '2026-03-03 18:26:09', status: '执行成功', duration: '368.24秒', count: '1449', db: '输出业务层/test_dm', table: 'daily_cmp_order' },
    { start: '2026-03-03 18:20:00', end: '2026-03-03 18:20:01', status: '执行成功', duration: '0.77秒', count: '1', db: '输出业务层/test_dm', table: 'daily_cmp_order' },
    { start: '2026-03-02 18:20:01', end: '2026-03-02 18:26:03', status: '执行成功', duration: '361.90秒', count: '1449', db: '输出业务层/test_dm', table: 'daily_cmp_order' },
    { start: '2026-03-02 18:20:00', end: '2026-03-02 18:20:01', status: '执行成功', duration: '0.66秒', count: '1', db: '输出业务层/test_dm', table: 'daily_cmp_order' },
    { start: '2026-03-01 18:20:01', end: '2026-03-01 18:26:09', status: '执行成功', duration: '367.94秒', count: '1449', db: '输出业务层/test_dm', table: 'daily_cmp_order' },
    { start: '2026-03-01 18:20:00', end: '2026-03-01 18:20:01', status: '执行成功', duration: '0.62秒', count: '1', db: '输出业务层/test_dm', table: 'daily_cmp_order' },
    { start: '2026-02-28 18:20:01', end: '2026-02-28 18:26:11', status: '执行成功', duration: '369.59秒', count: '1449', db: '输出业务层/test_dm', table: 'daily_cmp_order' },
    { start: '2026-02-28 18:20:00', end: '2026-02-28 18:20:01', status: '执行成功', duration: '0.79秒', count: '1', db: '输出业务层/test_dm', table: 'daily_cmp_order' },
    { start: '2026-02-27 18:20:01', end: '2026-02-27 18:26:04', status: '执行成功', duration: '362.78秒', count: '1449', db: '输出业务层/test_dm', table: 'daily_cmp_order' },
    { start: '2026-02-27 18:20:00', end: '2026-02-27 18:20:01', status: '执行成功', duration: '0.65秒', count: '1', db: '输出业务层/test_dm', table: 'daily_cmp_order' },
  ];

  const rows = scheduleData.map(r => `
    <tr>
      <td>${r.start}</td>
      <td>${r.end}</td>
      <td><span class="badge badge-blue">${r.status}</span></td>
      <td>${r.duration}</td>
      <td>${r.count}</td>
      <td>${r.db}</td>
      <td>${r.table}</td>
      <td class="op-cell">
        <i class="fa-regular fa-eye action-icon" title="查看"></i>
        <i class="fa-regular fa-file-lines action-icon" title="日志"></i>
      </td>
    </tr>`).join('');

  document.getElementById('summary-tab-content').innerHTML = `
    <div style="padding:16px 20px; overflow-y:auto">
      <div style="display:flex; align-items:center; gap:12px; margin-bottom:16px">
        <select class="form-control form-select" style="width:140px"><option>请选择状态</option><option>执行成功</option><option>执行失败</option></select>
        <span style="font-size:13px; color:var(--text-secondary)">下次调度执行时间: 2026-03-04 18:20:00</span>
        <button class="btn btn-primary btn-sm">数据补录</button>
      </div>
      <div class="ind-table-wrap" style="margin:0">
        <table class="data-table">
          <thead>
            <tr>
              <th>开始时间</th>
              <th>结束时间</th>
              <th>状态</th>
              <th>时长</th>
              <th>数据量</th>
              <th>库名</th>
              <th>表名</th>
              <th>操作</th>
            </tr>
          </thead>
          <tbody>${rows}</tbody>
        </table>
        <div class="pagination" style="padding:12px 16px">
          <span class="page-info">总共 158 条数据</span>
          <span class="page-nav">
            <span class="page-btn disabled">&lt;</span>
            <span class="page-btn active">1</span>
            <span class="page-btn">2</span>
            <span class="page-btn">3</span>
            <span class="page-btn">4</span>
            <span class="page-btn">5</span>
            <span class="page-btn disabled">···</span>
            <span class="page-btn">16</span>
            <span class="page-btn">&gt;</span>
          </span>
          <span class="page-size">10 条/页</span>
          <span style="color:var(--text-secondary); font-size:13px; margin-left:8px">跳至</span>
          <input type="text" class="form-control" style="width:48px; height:28px; text-align:center; padding:0; font-size:13px; margin:0 4px">
          <span style="color:var(--text-secondary); font-size:13px">页</span>
        </div>
      </div>
    </div>`;
}

// ============ 指标模型页面 ============
function renderIndicatorModel(container, config) {
  const attrs = [
    { key:'category', label:'所属分类', required:true, type:'select', placeholder:'请选择所属分类', help:'把企业里各种各样的指标，依据其性质、用途等特征进行分门别类' },
    { key:'code', label:'指标编码', required:true, type:'text', placeholder:'请输入', help:'给指标赋予的唯一编码', active:true },
    { key:'name', label:'指标名称', required:true, type:'text', placeholder:'请输入', help:'定义指标所衡量的对象、范围及核心内容' },
    { key:'type', label:'指标类型', required:true, type:'select', placeholder:'请选择', help:'定义指标的属性，属于原子指标、派生指标...' },
    { key:'dimension', label:'维度', required:false, type:'link', linkText:'添加维度', help:'根据指标分析的维度进行定义' },
    { key:'range', label:'数据范围', required:false, type:'range', help:'指标值区间的备注参考' },
    { key:'unit', label:'单位', required:false, type:'text', placeholder:'请输入', help:'是用于衡量指标数值的标准量度，用于明确...' },
    { key:'precision', label:'精度', required:false, type:'text', placeholder:'请输入', help:'指标数值保留的小数位' },
    { key:'desc', label:'描述', required:false, type:'text', placeholder:'请输入', help:'用于对指标信息的补充' },
    { key:'formula', label:'计算公式', required:false, type:'textarea', placeholder:'请输入', help:'用于补充指标的计算方法或公式' },
    { key:'period', label:'时间周期', required:false, type:'select', placeholder:'请选择', help:'用于统计计算指标的时间周期' },
  ];

  const rows = attrs.map(a => {
    let field = '';
    if (a.type === 'text') {
      field = `<input type="text" class="form-control" placeholder="${a.placeholder}" style="flex:1">`;
    } else if (a.type === 'select') {
      field = `<select class="form-control form-select" style="flex:1"><option>${a.placeholder}</option></select>`;
    } else if (a.type === 'textarea') {
      field = `<textarea class="form-control" placeholder="${a.placeholder}" rows="2" style="flex:1"></textarea>`;
    } else if (a.type === 'link') {
      field = `<span><i class="fa-solid fa-circle-plus" style="color:var(--primary-color); margin-right:4px"></i><a class="action-link">${a.linkText}</a></span>`;
    } else if (a.type === 'range') {
      field = `<div style="display:flex; align-items:center; gap:6px; flex:1"><input type="text" class="form-control" placeholder="请输入" style="flex:1"><span style="color:var(--text-tertiary)">—</span><input type="text" class="form-control" placeholder="请输入" style="flex:1"></div>`;
    }
    const req = a.required ? '<span style="color:#f53f3f; margin-right:2px">*</span>' : '';
    const activeCls = a.active ? ' model-attr-row-active' : '';
    return `
      <div class="model-attr-row${activeCls}" onclick="selectModelAttr(this,'${a.key}')">
        <i class="fa-solid fa-grip-vertical" style="color:#c9cdd4; cursor:grab; margin-right:8px"></i>
        <label class="model-attr-label">${req}${a.label}：</label>
        <div class="model-attr-field">${field}</div>
        <span class="model-attr-help"><i class="fa-regular fa-circle-question"></i> ${a.help}</span>
      </div>`;
  }).join('');

  container.innerHTML = `
    <div style="display:flex; height:100%">
      <div class="model-left">
        <div class="model-left-header">
          <span style="font-size:15px; font-weight:600">指标模型</span>
          <button class="btn btn-primary btn-sm"><i class="fa-solid fa-plus" style="margin-right:4px"></i>新增属性</button>
        </div>
        <div class="model-attr-list">${rows}</div>
      </div>
      <div class="model-right">
        <div class="model-right-header">配置</div>
        <div class="model-right-body">
          <div class="model-cfg-group">
            <label class="model-cfg-label required">标题</label>
            <input type="text" class="form-control" value="指标编码">
          </div>
          <div class="model-cfg-group">
            <label class="model-cfg-label required">表单类型</label>
            <input type="text" class="form-control" value="文本框">
          </div>
          <div class="model-cfg-section-title">编码规则配置</div>
          <div class="model-cfg-group">
            <label class="model-cfg-label">连接符</label>
            <input type="text" class="form-control" placeholder="请输入编码连接符">
          </div>
          <div class="model-rule-row">
            <i class="fa-solid fa-grip-vertical" style="color:#c9cdd4; cursor:grab"></i>
            <select class="form-control form-select" style="width:80px; font-size:12px"><option>流水码</option><option>日期码</option></select>
            <span style="font-size:12px; color:var(--text-secondary)">长度:</span>
            <input type="text" class="form-control" value="6" style="width:40px; text-align:center; font-size:12px">
            <span style="font-size:12px; color:var(--text-secondary)">起始值:</span>
            <input type="text" class="form-control" value="1" style="width:40px; text-align:center; font-size:12px">
          </div>
          <div style="margin-bottom:16px">
            <a class="action-link" style="font-size:13px"><i class="fa-solid fa-circle-plus" style="margin-right:4px"></i>添加编码规则</a>
          </div>
          <div class="model-cfg-group">
            <label class="model-cfg-label">编码示例 <i class="fa-solid fa-rotate" style="color:var(--text-tertiary); cursor:pointer; margin-left:4px; font-size:12px"></i></label>
            <input type="text" class="form-control" readonly style="background:#fafafa">
          </div>
          <div class="model-cfg-group">
            <label class="model-cfg-label">模板导入默认值</label>
            <input type="text" class="form-control" placeholder="请输入">
          </div>
          <div class="model-cfg-group">
            <label class="model-cfg-label">提示</label>
            <textarea class="form-control" rows="3" maxlength="200" style="resize:vertical">给指标赋予的唯一编码</textarea>
            <div style="text-align:right; font-size:12px; color:var(--text-tertiary); margin-top:4px">10 / 200</div>
          </div>
          <div style="padding-top:8px">
            <button class="btn btn-primary btn-sm">保存</button>
          </div>
        </div>
      </div>
    </div>`;
}

function selectModelAttr(el, key) {
  el.parentElement.querySelectorAll('.model-attr-row').forEach(r => r.classList.remove('model-attr-row-active'));
  el.classList.add('model-attr-row-active');
}

// ============ 时间周期页面 ============
function renderTimePeriod(container, config) {
  const rows = [
    { no:1, name:'年',  config:1, unit:'年',  desc:'按年分组' },
    { no:2, name:'半年', config:1, unit:'半年', desc:'按半年分组' },
    { no:3, name:'季度', config:1, unit:'季度', desc:'按季度分组' },
    { no:4, name:'月',  config:1, unit:'月',  desc:'按月分组' },
    { no:5, name:'周',  config:1, unit:'周',  desc:'按周分组' },
    { no:6, name:'日',  config:1, unit:'日',  desc:'按日分组' },
  ];

  const tbody = rows.map(r => `
    <tr>
      <td>${r.no}</td>
      <td><a class="action-link">${r.name}</a></td>
      <td>${r.config}</td>
      <td>${r.unit}</td>
      <td>${r.desc}</td>
      <td></td>
    </tr>`).join('');

  container.innerHTML = `
    <div style="padding:20px 24px">
      <div style="font-size:16px; font-weight:600; margin-bottom:16px">时间周期</div>
      <div style="margin-bottom:16px">
        <button class="btn btn-primary btn-sm" onclick="addTimePeriodRow()"><i class="fa-solid fa-plus" style="margin-right:4px"></i>新增一行</button>
      </div>
      <div class="ind-table-wrap" style="margin:0">
        <table class="data-table" id="time-period-table">
          <thead>
            <tr>
              <th style="width:60px">序号</th>
              <th>周期名称</th>
              <th style="width:100px">周期配置</th>
              <th>单位</th>
              <th>说明</th>
              <th style="width:80px">操作</th>
            </tr>
          </thead>
          <tbody>${tbody}
            <tr id="tp-new-row">
              <td>7</td>
              <td><input type="text" class="form-control" placeholder="请输入周期名称" style="font-size:13px"></td>
              <td><input type="text" class="form-control" placeholder="请输入" style="font-size:13px"></td>
              <td>
                <select class="form-control form-select" style="font-size:13px">
                  <option>请选择单位</option>
                  <option>年</option>
                  <option>半年</option>
                  <option>季度</option>
                  <option>月</option>
                  <option>周</option>
                  <option>日</option>
                </select>
              </td>
              <td><input type="text" class="form-control" placeholder="请输入说明" style="font-size:13px"></td>
              <td class="op-cell">
                <i class="fa-solid fa-check action-icon" style="color:#00b42a" title="确认"></i>
                <i class="fa-regular fa-trash-can action-icon action-icon-danger" title="删除"></i>
              </td>
            </tr>
          </tbody>
        </table>
        <div class="pagination" style="padding:12px 16px">
          <span class="page-info">共 7 条</span>
          <span class="page-nav">
            <span class="page-btn disabled">&lt;</span>
            <span class="page-btn active">1</span>
            <span class="page-btn">&gt;</span>
          </span>
        </div>
      </div>
    </div>`;
}

function addTimePeriodRow() {
  const tbody = document.querySelector('#time-period-table tbody');
  const count = tbody.querySelectorAll('tr').length + 1;
  const tr = document.createElement('tr');
  tr.innerHTML = `
    <td>${count}</td>
    <td><input type="text" class="form-control" placeholder="请输入周期名称" style="font-size:13px"></td>
    <td><input type="text" class="form-control" placeholder="请输入" style="font-size:13px"></td>
    <td>
      <select class="form-control form-select" style="font-size:13px">
        <option>请选择单位</option><option>年</option><option>半年</option><option>季度</option><option>月</option><option>周</option><option>日</option>
      </select>
    </td>
    <td><input type="text" class="form-control" placeholder="请输入说明" style="font-size:13px"></td>
    <td class="op-cell">
      <i class="fa-solid fa-check action-icon" style="color:#00b42a" title="确认"></i>
      <i class="fa-regular fa-trash-can action-icon action-icon-danger" title="删除"></i>
    </td>`;
  tbody.appendChild(tr);
}

// ============ 事实表页面 ============
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

function toggleFactNewMenu(btn) {
  const menu = btn.nextElementSibling;
  menu.style.display = menu.style.display === 'none' ? 'block' : 'none';
  const close = (e) => {
    if (!btn.parentElement.contains(e.target)) { menu.style.display = 'none'; document.removeEventListener('click', close); }
  };
  setTimeout(() => document.addEventListener('click', close), 0);
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

// ============ 指标审核页面 ============
function renderIndicatorAudit(container, config) {
  container.innerHTML = `
    <div class="split-layout">
      <div class="split-left">
        <div class="split-left-header">
          <span><i class="fa-solid fa-bars" style="margin-right:6px"></i>指标审核分类</span>
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
            <i class="fa-regular fa-folder" style="color:#f90"></i> 财务数据指标
          </div>
          <div class="cat-node" onclick="selectCatNode(this)">
            <span class="cat-toggle" style="transform:rotate(90deg)"><i class="fa-solid fa-caret-right"></i></span>
            <i class="fa-regular fa-folder" style="color:#f90"></i> 指标体系
          </div>
          <div class="cat-node" onclick="selectCatNode(this)" style="padding-left:32px">
            <i class="fa-regular fa-folder" style="color:#f90"></i> 免审
          </div>
        </div>
      </div>
      <div class="split-right">
        <div class="ind-tab-bar">
          <div class="ind-tab active"><i class="fa-regular fa-folder" style="color:#f90; margin-right:4px; font-size:12px"></i> 全部</div>
        </div>
        <div class="fact-edit-tabs" style="padding:0 16px">
          <div class="fact-edit-tab active">待处理</div>
          <div class="fact-edit-tab">已处理</div>
          <div class="fact-edit-tab">已发起</div>
        </div>
        <div class="ind-toolbar">
          <button class="btn btn-primary btn-sm" style="background:#ff7d00; border-color:#ff7d00">审核</button>
          <div style="flex:1"></div>
          <span style="font-size:13px; color:var(--text-secondary); margin-right:4px">审核状态</span>
          <div class="select-box select-sm" style="min-width:120px">请选择状态 <i class="fa-solid fa-chevron-down"></i></div>
          <span style="font-size:13px; color:var(--text-secondary); margin-right:4px; margin-left:8px">指标名称</span>
          <div class="search-box search-sm">
            <i class="fa-solid fa-magnifying-glass"></i>
            <input type="text" placeholder="请输入指标名称">
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
                <th>所属分类</th>
                <th>指标编码</th>
                <th>指标名称</th>
                <th>指标类型</th>
                <th>维度</th>
                <th>审核状态</th>
                <th>版本</th>
                <th>操作</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td colspan="9" style="text-align:center; padding:60px 0; color:var(--text-tertiary)">
                  <div><i class="fa-regular fa-folder-open" style="font-size:36px; color:#c9cdd4; display:block; margin-bottom:8px"></i>暂无数据</div>
                </td>
              </tr>
            </tbody>
          </table>
          <div class="pagination" style="padding:12px 16px">
            <span class="page-info">总共 0 条数据</span>
            <span class="page-nav">
              <span class="page-btn disabled">&lt;</span>
              <span class="page-btn active">1</span>
              <span class="page-btn disabled">&gt;</span>
            </span>
            <span class="page-size">20 条/页</span>
          </div>
        </div>
      </div>
    </div>`;
}

// ============ 数据集页面 ============
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
    { name:'设备故障率排行（近一个月）', type:'SQL', status:'', author:'Haom_a...', time:'2023-12-12 09:41:49', exec:'' },
    { name:'客活率回环比', type:'SQL', status:'', author:'Haom_a...', time:'2023-12-05 14:10:09', exec:'' },
    { name:'设备运行趋势分析', type:'SQL', status:'', author:'Haom_a...', time:'2023-12-08 13:44:20', exec:'' },
    { name:'文本注：截止计划完成时间未完成的生产工单数量', type:'SQL', status:'', author:'Haom_a...', time:'2023-11-07 15:54:43', exec:'' },
    { name:'订单交付及时性趋势分析1', type:'SQL', status:'', author:'Haom_a...', time:'2024-01-05 10:22:14', exec:'' },
    { name:'成品良率图', type:'SQL', status:'', author:'Haom_a...', time:'2023-11-06 13:57:47', exec:'' },
    { name:'本年度概况', type:'SQL', status:'', author:'Haom_a...', time:'2023-12-08 13:25:12', exec:'' },
    { name:'生产工龄统计', type:'SQL', status:'', author:'Haom_a...', time:'2023-11-17 23:19:03', exec:'' },
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
        <i class="fa-regular fa-copy action-icon" title="复制"></i>
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
          <div class="fact-new-wrap" style="position:relative; display:inline-block">
            <button class="btn btn-primary btn-sm" onclick="toggleFactNewMenu(this)">新建 <i class="fa-solid fa-caret-down" style="margin-left:2px"></i></button>
            <div class="fact-new-menu" style="display:none">
              <div class="fact-new-item" onclick="this.parentElement.style.display='none'; openDatasetForm()">
                <i class="fa-solid fa-code" style="color:var(--text-tertiary); margin-right:8px"></i>
                <div><div style="font-weight:500">SQL</div></div>
              </div>
              <div class="fact-new-item" onclick="this.parentElement.style.display='none'; openDatasetForm()">
                <i class="fa-solid fa-table" style="color:var(--text-tertiary); margin-right:8px"></i>
                <div><div style="font-weight:500">API</div></div>
              </div>
            </div>
          </div>
          <button class="btn btn-sm"><i class="fa-solid fa-download" style="margin-right:2px"></i>导入</button>
          <button class="btn btn-sm"><i class="fa-solid fa-upload" style="margin-right:2px"></i>导出</button>
          <button class="btn btn-sm">数据性映射</button>
          <button class="btn btn-sm" style="color:#f53f3f; border-color:#f53f3f">删除</button>
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
            <span class="page-info">总共 85 条数据</span>
            <span class="page-nav">
              <span class="page-btn disabled">&lt;</span>
              <span class="page-btn active">1</span>
              <span class="page-btn">2</span>
              <span class="page-btn">3</span>
              <span class="page-btn">4</span>
              <span class="page-btn">5</span>
              <span class="page-btn">&gt;</span>
            </span>
            <span class="page-size">20 条/页</span>
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
          <span style="font-size:15px; font-weight:500">到货趋势分析 <i class="fa-regular fa-pen-to-square" style="color:var(--text-tertiary); margin-left:6px; cursor:pointer; font-size:13px"></i></span>
          <div style="display:flex; gap:8px">
            <button class="btn btn-sm" onclick="loadPage('dataset')">返 回</button>
            <button class="btn btn-primary btn-sm">保存</button>
          </div>
        </div>
        <div class="ds-editor-area">
          <div class="ds-editor-left">
            <div class="ds-sql-editor">
              <div class="ds-sql-header"><i class="fa-solid fa-circle-xmark" style="position:absolute; right:10px; top:10px; color:#666; cursor:pointer; font-size:14px"></i></div>
              <div class="ds-sql-body"><pre class="ds-sql-code"><span class="ds-ln">26</span>        ELSE 0
<span class="ds-ln">27</span>        END
<span class="ds-ln">28</span>    ) / COUNT(DISTINCT receipt_id)
<span class="ds-ln">29</span>    ) * 100
<span class="ds-ln">30</span>  ),
<span class="ds-ln">31</span>  '0'
<span class="ds-ln">32</span>  ) AS '<span class="ds-str">到货及时率</span>'
<span class="ds-ln">33</span>FROM
<span class="ds-ln">34</span>  v_ams_purchase_receipt a
<span class="ds-ln">35</span><span class="ds-kw">where</span>
<span class="ds-ln">36</span>  year(a.<span class="ds-hl">update_time</span>) = '<span class="ds-var">\${p_year}</span>'
<span class="ds-ln">37</span><span class="ds-kw">group by</span>
<span class="ds-ln">38</span>  <span class="ds-cursor">m;</span></pre></div>
            </div>
            <div style="display:flex; justify-content:center; gap:10px; padding:12px 0">
              <button class="btn btn-primary btn-sm" style="min-width:80px">执行预览</button>
              <button class="btn btn-sm" style="min-width:80px">美 化</button>
            </div>
          </div>
          <div class="ds-editor-right">
            <div style="font-size:13px; font-weight:500; margin-bottom:10px"><i class="fa-regular fa-rectangle-list" style="margin-right:4px"></i>参数</div>
            <table class="data-table" style="font-size:12px; margin-bottom:10px">
              <thead><tr><th>参数名</th><th>查询控件</th><th>数据格式</th><th>默认值</th><th style="width:40px">操作</th></tr></thead>
              <tbody>
                <tr>
                  <td>p_year</td>
                  <td><i class="fa-regular fa-calendar" style="margin-right:4px; color:var(--text-tertiary)"></i>年度</td>
                  <td>YYYY</td>
                  <td></td>
                  <td class="op-cell"><i class="fa-regular fa-trash-can action-icon action-icon-danger" style="font-size:13px"></i></td>
                </tr>
              </tbody>
            </table>
            <div style="text-align:center">
              <button class="btn btn-sm" style="width:100%; border-style:dashed; color:var(--primary-color); border-color:var(--primary-color)"><i class="fa-solid fa-plus" style="margin-right:4px"></i>添加参数</button>
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
  const fields = [
    { name:'m', alias:'m', type:'BIGINT', prop:'时间', extra:'yyyy' },
    { name:'到货批次数量', alias:'到货批次数量', type:'BIGINT', prop:'度量', extra:'' },
    { name:'晚到货批次量', alias:'晚到货批次量', type:'DECIMAL', prop:'维度', extra:'订单状态' },
    { name:'到货及时率', alias:'到货及时率', type:'VARCHAR', prop:'属性', extra:'客户' },
  ];
  const rows = fields.map(f => `
    <tr>
      <td><a class="action-link">${f.name}</a></td>
      <td><input class="form-control" value="${f.alias}" style="font-size:12px"></td>
      <td>${f.type}</td>
      <td><select class="form-control form-select" style="font-size:12px"><option></option></select></td>
      <td class="op-cell"><i class="fa-regular fa-pen-to-square action-icon"></i></td>
      <td><select class="form-control form-select" style="font-size:12px"><option>请选择字段所属分类</option></select></td>
      <td><select class="form-control form-select" style="font-size:12px"><option>${f.prop}</option><option>时间</option><option>度量</option><option>维度</option><option>属性</option></select></td>
      <td>${f.extra ? `<select class="form-control form-select" style="font-size:12px"><option>${f.extra}</option></select>` : ''}</td>
    </tr>`).join('');

  document.getElementById('ds-tab-content').innerHTML = `
    <div style="padding:12px 20px; overflow-x:auto">
      <table class="data-table" style="font-size:13px; min-width:900px">
        <thead>
          <tr>
            <th>字段名</th><th>别名</th><th>数据类型</th><th>脱敏规则</th><th>脱敏例外</th>
            <th>所属分类 <i class="fa-regular fa-square-check" style="margin-left:2px"></i></th>
            <th>字段属性</th><th></th>
          </tr>
        </thead>
        <tbody>${rows}</tbody>
      </table>
    </div>`;
}

// ============ 原子指标数据绑定页面 ============
function openDataBindingPage() {
  const contentArea = document.getElementById('content-area');

  const fields = [
    { name: 'product_order_id', color: '#3370ff', configured: true },
    { name: 'product_order_number', color: '#3370ff', configured: false },
    { name: 'state', color: '#00b42a', configured: false },
    { name: 'customer_code', color: '#00b42a', configured: false },
    { name: 'related_order_num', color: '#ff7d00', configured: false },
    { name: 'related_root_order_num', color: '#ff7d00', configured: false },
    { name: 'remark', color: '#f5c542', configured: false },
    { name: 'approval_status', color: '#ff7d00', configured: false },
    { name: 'approval_suggestion', color: '#ff7d00', configured: false },
    { name: 'approval_time', color: '#ff7d00', configured: false },
    { name: 'approver', color: '#ff7d00', configured: false },
    { name: 'actual_approver', color: '#ff7d00', configured: false },
  ];

  const fieldListHtml = fields.map((f, i) => `
    <div class="field-item ${i === 0 ? 'selected' : ''}" onclick="selectFieldItem(this)">
      <span class="field-dot" style="background:${f.color}"></span>
      <span class="field-name">${f.name}</span>
      ${f.configured ? '<span class="badge badge-blue" style="margin-left:auto; font-size:11px">已配置</span>' : ''}
    </div>
  `).join('');

  contentArea.innerHTML = `
    <div class="split-layout">
      <!-- 左侧字段列表 -->
      <div class="split-left" style="width:200px; min-width:200px">
        <div class="split-left-header">
          <i class="fa-solid fa-list"></i>
          <span>数据集字段列表</span>
        </div>
        <div style="padding:8px 12px">
          <div style="display:flex; gap:6px; align-items:center; margin-bottom:8px">
            <select class="form-control form-select" style="height:28px; font-size:12px; flex:1; max-width:none">
              <option>生产订单表</option>
              <option>用户行为表</option>
              <option>销售明细表</option>
            </select>
            <i class="fa-solid fa-rotate" style="color:var(--primary-blue); cursor:pointer; font-size:13px"></i>
          </div>
          <div class="search-box search-sm" style="width:100%">
            <i class="fa-solid fa-magnifying-glass"></i>
            <input type="text" placeholder="搜索字段名" style="width:100%">
          </div>
        </div>
        <div class="field-list">
          <div class="field-item" onclick="selectFieldItem(this)" style="font-weight:500">
            <span class="field-dot" style="background:#3370ff"></span>
            <span class="field-name">全部</span>
          </div>
          ${fieldListHtml}
        </div>
      </div>
      <!-- 右侧配置详情 -->
      <div class="split-right" style="overflow-y:auto">
        <div class="edit-page-header" style="position:sticky; top:0; z-index:2; background:#fff">
          <span class="edit-page-title" style="font-size:14px; font-weight:400; color:var(--text-secondary)"></span>
          <div class="edit-page-actions">
            <button class="btn btn-sm" onclick="loadPage('indicator-mgmt')">返回</button>
          </div>
        </div>
        <div id="field-detail-panel">
          ${renderFieldDetail('product_order_id')}
        </div>
      </div>
    </div>`;
}

function renderFieldDetail(fieldName) {
  return `
    <div style="padding:20px 24px">
      <!-- 基本配置 -->
      <div class="section-title">基本配置</div>
      <div class="form-grid" style="margin-top:12px">
        <div class="form-row">
          <div class="form-cell">
            <div class="form-group">
              <label class="form-label">字段名</label>
              <div class="form-field">
                <input type="text" class="form-control" value="${fieldName}" readonly style="background:#f7f8fa">
              </div>
            </div>
          </div>
          <div class="form-cell">
            <div class="form-group">
              <label class="form-label">别名</label>
              <div class="form-field">
                <input type="text" class="form-control" value="${fieldName}" readonly style="background:#f7f8fa">
              </div>
            </div>
          </div>
        </div>
        <div class="form-row">
          <div class="form-cell">
            <div class="form-group">
              <label class="form-label">字段属性</label>
              <div class="form-field">
                <span class="badge badge-blue" style="padding:4px 12px; font-size:13px">度量</span>
              </div>
            </div>
          </div>
          <div class="form-cell"></div>
        </div>
      </div>

      <!-- 关联原子指标 -->
      <div class="section-title" style="margin-top:28px">关联原子指标</div>
      <div style="margin:12px 0">
        <button class="btn btn-sm"><i class="fa-solid fa-check-circle" style="color:var(--primary-blue)"></i> 选择指标</button>
      </div>
      <div class="bind-table-wrap">
        <table class="data-table">
          <thead>
            <tr>
              <th>所属分类</th>
              <th>指标编码</th>
              <th>指标名称</th>
              <th>数据范围</th>
              <th>单</th>
              <th>聚合函数</th>
              <th>操作</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>
                <select class="form-control form-select" style="height:26px; font-size:12px; max-width:none; width:100px; background:#fff7e8; color:#ff7d00">
                  <option selected>免审</option>
                  <option>指标体系</option>
                </select>
              </td>
              <td><span style="color:#c9cdd4">000018</span></td>
              <td>生产订单</td>
              <td>
                <div style="display:flex; align-items:center; gap:4px">
                  <input type="text" class="form-control" style="height:26px; font-size:12px; width:60px; max-width:none" placeholder="请输入">
                  <span style="color:var(--text-tertiary)">—</span>
                  <input type="text" class="form-control" style="height:26px; font-size:12px; width:60px; max-width:none" placeholder="请输入">
                </div>
              </td>
              <td><i class="fa-solid fa-chevron-down" style="font-size:10px; color:var(--text-tertiary)"></i></td>
              <td>
                <select class="form-control form-select" style="height:26px; font-size:12px; max-width:none; width:100px">
                  <option selected>去重计数</option>
                  <option>求和</option>
                  <option>计数</option>
                  <option>平均值</option>
                  <option>最大值</option>
                  <option>最小值</option>
                </select>
              </td>
              <td class="op-cell">
                <a class="action-link" style="color:#ff7d00" onclick="openPreviewModal()">执行预览</a>
                <a class="action-link">解绑</a>
                <a class="action-link" style="color:var(--primary-blue)">保存</a>
              </td>
            </tr>
            <tr>
              <td>
                <select class="form-control form-select" style="height:26px; font-size:12px; max-width:none; width:100px">
                  <option>免审</option>
                  <option selected>指标体系</option>
                </select>
              </td>
              <td><span style="color:#c9cdd4">000009</span></td>
              <td>生产订单总数</td>
              <td>
                <div style="display:flex; align-items:center; gap:4px">
                  <input type="text" class="form-control" style="height:26px; font-size:12px; width:60px; max-width:none" placeholder="请输入">
                  <span style="color:var(--text-tertiary)">—</span>
                  <input type="text" class="form-control" style="height:26px; font-size:12px; width:60px; max-width:none" placeholder="请输入">
                </div>
              </td>
              <td></td>
              <td>
                <select class="form-control form-select" style="height:26px; font-size:12px; max-width:none; width:100px">
                  <option selected>去重计数</option>
                  <option>求和</option>
                  <option>计数</option>
                </select>
              </td>
              <td class="op-cell">
                <a class="action-link" style="color:#ff7d00" onclick="openPreviewModal()">执行预览</a>
                <a class="action-link">解绑</a>
                <a class="action-link" style="color:var(--primary-blue)">保存</a>
              </td>
            </tr>
            <tr>
              <td>
                <select class="form-control form-select" style="height:26px; font-size:12px; max-width:none; width:100px">
                  <option>免审</option>
                  <option selected>指标体系</option>
                </select>
              </td>
              <td><span style="color:#c9cdd4">000002</span></td>
              <td>生产订单数量</td>
              <td>
                <div style="display:flex; align-items:center; gap:4px">
                  <input type="text" class="form-control" style="height:26px; font-size:12px; width:60px; max-width:none" placeholder="请输入">
                  <span style="color:var(--text-tertiary)">—</span>
                  <input type="text" class="form-control" style="height:26px; font-size:12px; width:60px; max-width:none" placeholder="请输入">
                </div>
              </td>
              <td></td>
              <td>
                <select class="form-control form-select" style="height:26px; font-size:12px; max-width:none; width:100px">
                  <option selected>去重计数</option>
                  <option>求和</option>
                  <option>计数</option>
                </select>
              </td>
              <td class="op-cell">
                <a class="action-link" style="color:#ff7d00" onclick="openPreviewModal()">执行预览</a>
                <a class="action-link">解绑</a>
                <a class="action-link" style="color:var(--primary-blue)">保存</a>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>`;
}

function selectFieldItem(el) {
  el.closest('.field-list').querySelectorAll('.field-item').forEach(f => f.classList.remove('selected'));
  el.classList.add('selected');
  const name = el.querySelector('.field-name')?.textContent;
  if (name && name !== '全部') {
    document.getElementById('field-detail-panel').innerHTML = renderFieldDetail(name);
  }
}

// ============ 派生指标数据绑定页面 ============
function openDerivedBindingPage() {
  const contentArea = document.getElementById('content-area');

  contentArea.innerHTML = `
    <div class="edit-page">
      <div class="edit-page-header">
        <span class="edit-page-title"><i class="fa-regular fa-clone" style="margin-right:6px; color:var(--text-tertiary)"></i>新建派生指标</span>
        <div class="edit-page-actions">
          <button class="btn btn-sm" onclick="loadPage('indicator-mgmt')">返回</button>
        </div>
      </div>
      <div class="edit-page-body" style="padding:20px 24px">
        <!-- 基本配置 -->
        <div class="section-title">基本配置</div>
        <div style="margin:16px 0">
          <button class="btn btn-primary btn-sm">选择原子指标</button>
        </div>
        <div class="form-grid" style="margin-top:12px">
          <div class="form-row">
            <div class="form-cell">
              <div class="form-group">
                <label class="form-label">指标名称</label>
                <div class="form-field">
                  <input type="text" class="form-control" value="生产订单" readonly style="background:#fff7e8; color:#ff7d00">
                </div>
              </div>
            </div>
            <div class="form-cell">
              <div class="form-group">
                <label class="form-label">指标编码</label>
                <div class="form-field">
                  <input type="text" class="form-control" value="000018" readonly style="background:#f7f8fa; color:var(--text-tertiary)">
                </div>
              </div>
            </div>
            <div class="form-cell">
              <div class="form-group">
                <label class="form-label">数据集</label>
                <div class="form-field">
                  <a class="action-link" style="line-height:32px">生产订单表</a>
                </div>
              </div>
            </div>
          </div>
          <div class="form-row">
            <div class="form-cell">
              <div class="form-group">
                <label class="form-label">精度</label>
                <div class="form-field">
                  <input type="text" class="form-control" value="" style="background:#fff7e8">
                </div>
              </div>
            </div>
            <div class="form-cell">
              <div class="form-group">
                <label class="form-label">单位</label>
                <div class="form-field">
                  <input type="text" class="form-control" value="个" readonly style="background:#f7f8fa">
                </div>
              </div>
            </div>
            <div class="form-cell"></div>
          </div>
        </div>

        <!-- 关联派生指标 -->
        <div class="section-title" style="margin-top:32px">关联派生指标</div>
        <div style="margin:12px 0">
          <button class="btn btn-sm"><i class="fa-solid fa-check-circle" style="color:var(--primary-blue)"></i> 选择指标</button>
        </div>
        <div class="bind-table-wrap">
          <table class="data-table">
            <thead>
              <tr>
                <th>所属分类</th>
                <th>指标编码</th>
                <th>指标名称</th>
                <th>数据范围</th>
                <th>单位</th>
                <th>精度</th>
                <th>描述</th>
                <th>操作</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>
                  <select class="form-control form-select" style="height:26px; font-size:12px; max-width:none; width:80px">
                    <option selected>免审</option>
                    <option>指标体系</option>
                  </select>
                </td>
                <td><span style="color:#c9cdd4">000020</span></td>
                <td>创建生产订单</td>
                <td>
                  <div style="display:flex; align-items:center; gap:4px">
                    <input type="text" class="form-control" style="height:26px; font-size:12px; width:56px; max-width:none" placeholder="请输入">
                    <span style="color:var(--text-tertiary)">—</span>
                    <input type="text" class="form-control" style="height:26px; font-size:12px; width:56px; max-width:none" placeholder="请输入">
                  </div>
                </td>
                <td><input type="text" class="form-control" style="height:26px; font-size:12px; width:56px; max-width:none" placeholder="请输入"></td>
                <td><input type="text" class="form-control" style="height:26px; font-size:12px; width:56px; max-width:none" placeholder="请输入"></td>
                <td><input type="text" class="form-control" style="height:26px; font-size:12px; width:80px; max-width:none" placeholder="请输入"></td>
                <td class="op-cell">
                  <a class="action-link" style="color:#ff7d00" onclick="openPreviewModal()">执行预览</a>
                  <a class="action-link">解绑</a>
                  <a class="action-link" style="color:var(--primary-blue)">保存</a>
                </td>
              </tr>
              <tr>
                <td>
                  <select class="form-control form-select" style="height:26px; font-size:12px; max-width:none; width:80px">
                    <option selected>免审</option>
                    <option>指标体系</option>
                  </select>
                </td>
                <td><span style="color:#c9cdd4">000019</span></td>
                <td>日完成生产订单</td>
                <td>
                  <div style="display:flex; align-items:center; gap:4px">
                    <input type="text" class="form-control" style="height:26px; font-size:12px; width:56px; max-width:none" placeholder="请输入">
                    <span style="color:var(--text-tertiary)">—</span>
                    <input type="text" class="form-control" style="height:26px; font-size:12px; width:56px; max-width:none" placeholder="请输入">
                  </div>
                </td>
                <td><input type="text" class="form-control" style="height:26px; font-size:12px; width:56px; max-width:none" value="个"></td>
                <td><input type="text" class="form-control" style="height:26px; font-size:12px; width:56px; max-width:none" placeholder="请输入"></td>
                <td><input type="text" class="form-control" style="height:26px; font-size:12px; width:80px; max-width:none" placeholder="请输入"></td>
                <td class="op-cell">
                  <a class="action-link" style="color:#ff7d00" onclick="openPreviewModal()">执行预览</a>
                  <a class="action-link">解绑</a>
                  <a class="action-link" style="color:var(--primary-blue)">保存</a>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>`;
}

// ============ 衍生指标数据绑定页面 ============
function openComputedBindingPage() {
  const contentArea = document.getElementById('content-area');

  contentArea.innerHTML = `
    <div class="edit-page">
      <div class="edit-page-header">
        <span class="edit-page-title"><i class="fa-regular fa-clone" style="margin-right:6px; color:var(--text-tertiary)"></i>新建衍生指标</span>
        <div class="edit-page-actions">
          <button class="btn btn-sm" onclick="loadPage('indicator-mgmt')">返回</button>
          <button class="btn btn-primary btn-sm">保存</button>
        </div>
      </div>
      <div class="edit-page-body" style="padding:20px 24px">
        <!-- 基本配置 -->
        <div class="section-title">基本配置</div>
        <div style="margin:16px 0">
          <button class="btn btn-sm">选择衍生指标</button>
        </div>
        <div class="form-grid" style="margin-top:12px">
          <div class="form-row">
            <div class="form-cell">
              <div class="form-group">
                <label class="form-label required">所属分类</label>
                <div class="form-field">
                  <select class="form-control form-select">
                    <option selected>免审</option>
                    <option>指标体系</option>
                    <option>财务数据指标</option>
                  </select>
                  <i class="fa-regular fa-circle-question help-icon"></i>
                </div>
              </div>
            </div>
            <div class="form-cell">
              <div class="form-group">
                <label class="form-label">指标编码</label>
                <div class="form-field">
                  <input type="text" class="form-control" value="000021" readonly style="background:#f7f8fa; color:var(--text-tertiary)">
                  <i class="fa-regular fa-circle-question help-icon"></i>
                </div>
              </div>
            </div>
          </div>
          <div class="form-row">
            <div class="form-cell">
              <div class="form-group">
                <label class="form-label required">指标名称</label>
                <div class="form-field">
                  <input type="text" class="form-control" value="日完成占比">
                  <i class="fa-solid fa-xmark" style="color:#c9cdd4; cursor:pointer; margin:0 2px"></i>
                  <i class="fa-regular fa-circle-question help-icon"></i>
                </div>
              </div>
            </div>
            <div class="form-cell">
              <div class="form-group">
                <label class="form-label">数据范围</label>
                <div class="form-field">
                  <input type="text" class="form-control form-control-range" placeholder="请输入" style="background:#fff7e8">
                  <span class="range-sep">—</span>
                  <input type="text" class="form-control form-control-range" placeholder="请输入" style="background:#fff7e8">
                  <i class="fa-regular fa-circle-question help-icon"></i>
                </div>
              </div>
            </div>
          </div>
          <div class="form-row">
            <div class="form-cell">
              <div class="form-group">
                <label class="form-label">单位</label>
                <div class="form-field">
                  <input type="text" class="form-control" value="%">
                  <i class="fa-solid fa-xmark" style="color:#c9cdd4; cursor:pointer; margin:0 2px"></i>
                  <i class="fa-regular fa-circle-question help-icon"></i>
                </div>
              </div>
            </div>
            <div class="form-cell">
              <div class="form-group">
                <label class="form-label">精度</label>
                <div class="form-field">
                  <input type="text" class="form-control" value="3">
                  <i class="fa-regular fa-circle-question help-icon"></i>
                </div>
              </div>
            </div>
          </div>
          <div class="form-row">
            <div class="form-cell">
              <div class="form-group">
                <label class="form-label">描述</label>
                <div class="form-field">
                  <textarea class="form-control" placeholder="请输入" rows="2"></textarea>
                  <i class="fa-regular fa-circle-question help-icon" style="align-self:flex-start; margin-top:8px"></i>
                </div>
              </div>
            </div>
            <div class="form-cell">
              <div class="form-group">
                <label class="form-label">计算公式</label>
                <div class="form-field">
                  <textarea class="form-control" placeholder="请输入" rows="2"></textarea>
                  <i class="fa-regular fa-circle-question help-icon" style="align-self:flex-start; margin-top:8px"></i>
                </div>
              </div>
            </div>
          </div>
        </div>

        <!-- 计算逻辑 -->
        <div class="section-title" style="margin-top:32px">计算逻辑</div>
        <div class="calc-logic-area">
          <div class="calc-toolbar">
            <button class="btn btn-sm">选择指标</button>
            <button class="btn btn-sm">解绑</button>
          </div>
          <div class="calc-layout">
            <!-- 左侧已选指标列表 -->
            <div class="calc-indicators">
              <div class="calc-ind-item selected">
                <span class="calc-ind-dot" style="background:#f5c542"></span>
                <span>000019(日完成生产订单)</span>
                <i class="fa-regular fa-trash-can calc-ind-del"></i>
              </div>
              <div class="calc-ind-item">
                <span class="calc-ind-dot" style="background:#f5c542"></span>
                <span>000018(生产订单)</span>
                <i class="fa-regular fa-trash-can calc-ind-del"></i>
              </div>
            </div>
            <!-- 右侧公式编辑器 -->
            <div class="calc-editor">
              <div class="calc-formula-bar">
                <span style="color:var(--text-secondary); font-size:12px; margin-right:8px; white-space:nowrap">计算公式：</span>
                <span class="calc-op-btn">+</span>
                <span class="calc-op-btn">-</span>
                <span class="calc-op-btn">*</span>
                <span class="calc-op-btn">/</span>
                <span class="calc-op-btn">()</span>
              </div>
              <div class="calc-editor-body">
                <div class="calc-line">
                  <span class="calc-line-num">1</span>
                  <span class="calc-tag tag-blue">\${日完成生产订单}</span>
                  <span style="color:var(--text-primary); margin:0 2px">/</span>
                  <span class="calc-tag tag-green">\${生产订单}</span>
                  <span style="color:var(--text-primary); margin:0 2px">*100</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>`;
}

// ============ 执行预览弹窗 ============
function openPreviewModal() {
  const existing = document.getElementById('preview-modal-overlay');
  if (existing) existing.remove();

  const previewData = [
    { date: '2023-03-01', value: '1' },
    { date: '2023-02-15', value: '4' },
    { date: '2023-02-14', value: '3' },
    { date: '2023-01-10', value: '2' },
    { date: '2022-12-31', value: '1' },
    { date: '2022-12-27', value: '2' },
    { date: '2022-12-22', value: '3' },
    { date: '2022-12-08', value: '1' },
    { date: '2022-12-07', value: '1' },
    { date: '2022-12-06', value: '3' },
  ];

  const rows = previewData.map(r => `
    <tr>
      <td>${r.date}</td>
      <td>${r.value}</td>
    </tr>`).join('');

  const overlay = document.createElement('div');
  overlay.id = 'preview-modal-overlay';
  overlay.className = 'modal-overlay';
  overlay.innerHTML = `
    <div class="modal" style="width:640px">
      <div class="modal-header">
        <span class="modal-title">执行预览</span>
        <div class="modal-close" onclick="closePreviewModal()"><i class="fa-solid fa-xmark"></i></div>
      </div>
      <div class="modal-body" style="padding:0; max-height:420px; overflow-y:auto">
        <table class="data-table preview-table">
          <thead>
            <tr>
              <th>时间列</th>
              <th>日完成生产订单(个)</th>
            </tr>
          </thead>
          <tbody>${rows}</tbody>
        </table>
      </div>
      <div class="modal-footer">
        <button class="btn btn-sm" onclick="closePreviewModal()">关 闭</button>
      </div>
    </div>`;

  document.body.appendChild(overlay);
}

function closePreviewModal() {
  const el = document.getElementById('preview-modal-overlay');
  if (el) el.remove();
}

// ============ 更多操作下拉 ============
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

// ============ 指标关系图弹窗 ============
function openRelationGraph() {
  const existing = document.getElementById('relation-graph-overlay');
  if (existing) existing.remove();

  const overlay = document.createElement('div');
  overlay.id = 'relation-graph-overlay';
  overlay.className = 'modal-overlay';
  overlay.innerHTML = `
    <div class="modal" style="width:860px; max-width:90vw; height:520px; display:flex; flex-direction:column">
      <div class="modal-header">
        <span class="modal-title">指标关系图</span>
        <div class="modal-close" onclick="closeRelationGraph()"><i class="fa-solid fa-xmark"></i></div>
      </div>
      <div class="modal-body" style="flex:1; padding:0; overflow:hidden; position:relative">
        <div class="graph-canvas" id="relation-graph-canvas">
          <svg id="relation-svg" width="100%" height="100%"></svg>
        </div>
        <div class="graph-minimap" id="graph-minimap">
          <svg id="minimap-svg" width="100%" height="100%"></svg>
        </div>
      </div>
    </div>`;

  document.body.appendChild(overlay);
  requestAnimationFrame(() => drawRelationGraph());
}

function closeRelationGraph() {
  const el = document.getElementById('relation-graph-overlay');
  if (el) el.remove();
}

function drawRelationGraph() {
  const svg = document.getElementById('relation-svg');
  const canvas = document.getElementById('relation-graph-canvas');
  if (!svg || !canvas) return;

  const W = canvas.clientWidth;
  const H = canvas.clientHeight;
  svg.setAttribute('viewBox', `0 0 ${W} ${H}`);

  const nodes = [
    { id: 'n1', label: '生产订单',     type: 'atomic',  x: W * 0.18, y: H * 0.58 },
    { id: 'n2', label: '创建生产订单',   type: 'derived', x: W * 0.48, y: H * 0.45 },
    { id: 'n3', label: '日完成生产订单', type: 'derived', x: W * 0.48, y: H * 0.2 },
    { id: 'n4', label: '日完成占比',     type: 'computed',x: W * 0.82, y: H * 0.58 },
  ];

  const edges = [
    { from: 'n1', to: 'n3' },
    { from: 'n1', to: 'n2' },
    { from: 'n1', to: 'n4' },
    { from: 'n3', to: 'n4' },
    { from: 'n2', to: 'n3' },
  ];

  const nodeMap = {};
  nodes.forEach(n => nodeMap[n.id] = n);

  let gridLines = '';
  const gs = 30;
  for (let gx = 0; gx <= W; gx += gs) {
    gridLines += `<line x1="${gx}" y1="0" x2="${gx}" y2="${H}" stroke="#f0f1f3" stroke-width="0.5"/>`;
  }
  for (let gy = 0; gy <= H; gy += gs) {
    gridLines += `<line x1="0" y1="${gy}" x2="${W}" y2="${gy}" stroke="#f0f1f3" stroke-width="0.5"/>`;
  }

  let edgePaths = '';
  edges.forEach(e => {
    const from = nodeMap[e.from];
    const to = nodeMap[e.to];
    edgePaths += `<line x1="${from.x}" y1="${from.y}" x2="${to.x}" y2="${to.y}" stroke="#c9cdd4" stroke-width="1.2"/>`;
  });

  let nodeEls = '';
  nodes.forEach(n => {
    const iconColor = n.type === 'atomic' ? '#3370ff' : '#86909c';
    const icon = n.type === 'atomic'
      ? `<circle cx="${n.x - 64}" cy="${n.y}" r="5" fill="${iconColor}"/>`
      : `<path d="M${n.x - 68} ${n.y - 3} Q${n.x - 64} ${n.y - 7} ${n.x - 60} ${n.y - 3} Q${n.x - 56} ${n.y + 4} ${n.x - 52} ${n.y - 3}" stroke="${iconColor}" fill="none" stroke-width="1.5"/>`;

    const dotX = n.x + 64;
    nodeEls += `
      <g class="graph-node" data-id="${n.id}">
        <rect x="${n.x - 75}" y="${n.y - 16}" width="150" height="32" rx="4"
              fill="#fff" stroke="#e5e6eb" stroke-width="1"/>
        ${icon}
        <text x="${n.x}" y="${n.y + 5}" text-anchor="middle" font-size="13"
              fill="#1d2129" font-family="system-ui, sans-serif">${n.label}</text>
        <circle cx="${dotX}" cy="${n.y}" r="5" fill="#52c41a" stroke="#fff" stroke-width="1.5"/>
      </g>`;
  });

  svg.innerHTML = gridLines + edgePaths + nodeEls;

  drawMinimap(W, H, nodes, edges, nodeMap);
}

function drawMinimap(W, H, nodes, edges, nodeMap) {
  const msvg = document.getElementById('minimap-svg');
  if (!msvg) return;

  const mw = 100, mh = 70;
  msvg.setAttribute('viewBox', `0 0 ${W} ${H}`);
  msvg.setAttribute('width', mw);
  msvg.setAttribute('height', mh);

  let content = `<rect width="${W}" height="${H}" fill="#fafafa" stroke="#e5e6eb" stroke-width="4"/>`;

  edges.forEach(e => {
    const from = nodeMap[e.from];
    const to = nodeMap[e.to];
    content += `<line x1="${from.x}" y1="${from.y}" x2="${to.x}" y2="${to.y}" stroke="#c9cdd4" stroke-width="4"/>`;
  });

  nodes.forEach(n => {
    content += `<rect x="${n.x - 30}" y="${n.y - 8}" width="60" height="16" rx="2" fill="#e8f3ff" stroke="#bedaff" stroke-width="2"/>`;
  });

  content += `<rect x="2" y="2" width="${W - 4}" height="${H - 4}" fill="none" stroke="#f759ab" stroke-width="6" rx="4"/>`;

  msvg.innerHTML = content;
}

// ============ 批量创建派生指标页面 ============
function openBatchCreatePage() {
  const contentArea = document.getElementById('content-area');
  contentArea.innerHTML = `
    <div class="edit-page" style="display:flex; flex-direction:column; height:100%">
      <div class="edit-page-header">
        <span class="edit-page-title">批量创建派生指标</span>
        <div class="edit-page-actions">
          <button class="btn btn-sm" onclick="loadPage('indicator-mgmt')">返 回</button>
          <button class="btn btn-primary btn-sm">保存</button>
        </div>
      </div>
      <div class="batch-body">
        <!-- 左侧配置面板 -->
        <div class="batch-config">
          <div class="batch-section">
            <div class="batch-section-header">
              <i class="fa-solid fa-caret-right"></i> 选择原子指标
            </div>
            <div class="batch-section-body">
              <div class="batch-tag-item">
                <span class="batch-tag-icon" style="background:#3370ff">A</span>
                <select class="form-control form-select" style="flex:1; min-width:0">
                  <option selected>营收收入</option>
                  <option>生产订单</option>
                </select>
                <i class="fa-solid fa-xmark batch-tag-remove"></i>
              </div>
              <button class="btn btn-sm batch-add-btn"><i class="fa-solid fa-plus"></i> 添加原子指标</button>
            </div>
          </div>

          <div class="batch-section">
            <div class="batch-section-header">
              <i class="fa-solid fa-caret-right"></i> 添加修饰词
            </div>
            <div class="batch-section-body">
              <div class="batch-chips">
                <span class="batch-chip">创建 <i class="fa-solid fa-xmark"></i></span>
                <span class="batch-chip">生效 <i class="fa-solid fa-xmark"></i></span>
                <span class="batch-chip">完成 <i class="fa-solid fa-xmark"></i></span>
              </div>
              <button class="btn btn-sm batch-add-btn"><i class="fa-solid fa-plus"></i> 选择修饰词</button>
            </div>
          </div>

          <div class="batch-section">
            <div class="batch-section-header">
              <i class="fa-solid fa-caret-right"></i> 选择时间周期
            </div>
            <div class="batch-section-body">
              <div class="batch-tag-item">
                <span class="batch-tag-icon" style="background:#3370ff">A</span>
                <select class="form-control form-select" style="flex:1; min-width:0">
                  <option selected>年</option>
                  <option>月</option>
                  <option>周</option>
                  <option>日</option>
                </select>
                <i class="fa-solid fa-xmark batch-tag-remove"></i>
              </div>
              <button class="btn btn-sm batch-add-btn"><i class="fa-solid fa-plus"></i> 添加时间周期</button>
            </div>
          </div>

          <div style="padding:16px 0; text-align:center">
            <button class="btn btn-primary" onclick="renderBatchPreview()">生成预览</button>
          </div>
        </div>

        <!-- 右侧流程图 -->
        <div class="batch-preview">
          <div class="graph-canvas" id="batch-graph-canvas" style="width:100%; height:100%">
            <svg id="batch-svg" width="100%" height="100%"></svg>
          </div>
          <div class="graph-minimap" id="batch-minimap">
            <svg id="batch-minimap-svg" width="100%" height="100%"></svg>
          </div>
        </div>
      </div>
    </div>`;

  setTimeout(() => renderBatchPreview(), 100);
}

function renderBatchPreview() {
  const svg = document.getElementById('batch-svg');
  const canvas = document.getElementById('batch-graph-canvas');
  if (!svg || !canvas) return;

  const W = canvas.clientWidth;
  const H = canvas.clientHeight;
  svg.setAttribute('viewBox', `0 0 ${W} ${H}`);

  const cy = H * 0.5;
  const nodes = [
    { id: 'start',  label: '批量创建派生指标', x: W * 0.12, y: cy, w: 130, h: 32, fill: '#fff', stroke: '#e5e6eb' },
    { id: 'atomic', label: '营收收入',         x: W * 0.30, y: cy, w: 90,  h: 32, fill: '#fff', stroke: '#e5e6eb' },
    { id: 'mod1',   label: '创建',             x: W * 0.48, y: cy - 50, w: 60, h: 28, fill: '#e8f7ff', stroke: '#91d5ff' },
    { id: 'mod2',   label: '生效',             x: W * 0.48, y: cy,      w: 60, h: 28, fill: '#e8f7ff', stroke: '#91d5ff' },
    { id: 'mod3',   label: '完成',             x: W * 0.48, y: cy + 50, w: 60, h: 28, fill: '#e8f7ff', stroke: '#91d5ff' },
    { id: 'time1',  label: '年',               x: W * 0.60, y: cy - 50, w: 40, h: 28, fill: '#fff', stroke: '#e5e6eb' },
    { id: 'time2',  label: '年',               x: W * 0.60, y: cy,      w: 40, h: 28, fill: '#fff', stroke: '#e5e6eb' },
    { id: 'time3',  label: '年',               x: W * 0.60, y: cy + 50, w: 40, h: 28, fill: '#fff', stroke: '#e5e6eb' },
    { id: 'res1',   label: '年创建营收收入',    x: W * 0.78, y: cy - 50, w: 120, h: 32, fill: '#fff', stroke: '#e5e6eb', dot: true },
    { id: 'res2',   label: '年生效营收收入',    x: W * 0.78, y: cy,      w: 120, h: 32, fill: '#fff', stroke: '#e5e6eb', dot: true },
    { id: 'res3',   label: '年完成营收收入',    x: W * 0.78, y: cy + 50, w: 120, h: 32, fill: '#fff', stroke: '#e5e6eb', dot: true },
  ];

  const edges = [
    ['start','atomic'], ['atomic','mod1'], ['atomic','mod2'], ['atomic','mod3'],
    ['mod1','time1'], ['mod2','time2'], ['mod3','time3'],
    ['time1','res1'], ['time2','res2'], ['time3','res3'],
  ];

  const nodeMap = {};
  nodes.forEach(n => nodeMap[n.id] = n);

  let gridLines = '';
  const gs = 30;
  for (let gx = 0; gx <= W; gx += gs) {
    gridLines += `<line x1="${gx}" y1="0" x2="${gx}" y2="${H}" stroke="#f0f1f3" stroke-width="0.5"/>`;
  }
  for (let gy = 0; gy <= H; gy += gs) {
    gridLines += `<line x1="0" y1="${gy}" x2="${W}" y2="${gy}" stroke="#f0f1f3" stroke-width="0.5"/>`;
  }

  let edgePaths = '';
  edges.forEach(([fid, tid]) => {
    const f = nodeMap[fid], t = nodeMap[tid];
    const x1 = f.x + f.w / 2, y1 = f.y;
    const x2 = t.x - t.w / 2, y2 = t.y;
    const mx = (x1 + x2) / 2;
    edgePaths += `<path d="M${x1} ${y1} C${mx} ${y1}, ${mx} ${y2}, ${x2} ${y2}"
                   fill="none" stroke="#c9cdd4" stroke-width="1.2"/>`;
    const arrowX = x2 - 1;
    edgePaths += `<polygon points="${arrowX},${y2 - 3.5} ${arrowX + 6},${y2} ${arrowX},${y2 + 3.5}"
                   fill="#c9cdd4"/>`;
  });

  let nodeEls = '';
  nodes.forEach(n => {
    const rx = n.x - n.w / 2, ry = n.y - n.h / 2;
    nodeEls += `<rect x="${rx}" y="${ry}" width="${n.w}" height="${n.h}" rx="4"
                  fill="${n.fill}" stroke="${n.stroke}" stroke-width="1"/>`;
    nodeEls += `<text x="${n.x}" y="${n.y + 4}" text-anchor="middle" font-size="12"
                  fill="#1d2129" font-family="system-ui, sans-serif">${n.label}</text>`;
    if (n.dot) {
      nodeEls += `<circle cx="${n.x + n.w / 2 + 8}" cy="${n.y}" r="4.5" fill="#3370ff"/>`;
    }
  });

  svg.innerHTML = gridLines + edgePaths + nodeEls;

  const msvg = document.getElementById('batch-minimap-svg');
  if (msvg) {
    msvg.setAttribute('viewBox', `0 0 ${W} ${H}`);
    msvg.setAttribute('width', 100);
    msvg.setAttribute('height', 70);
    let mc = `<rect width="${W}" height="${H}" fill="#fafafa" stroke="#e5e6eb" stroke-width="4"/>`;
    edges.forEach(([fid, tid]) => {
      const f = nodeMap[fid], t = nodeMap[tid];
      mc += `<line x1="${f.x}" y1="${f.y}" x2="${t.x}" y2="${t.y}" stroke="#c9cdd4" stroke-width="4"/>`;
    });
    nodes.forEach(n => {
      mc += `<rect x="${n.x - 20}" y="${n.y - 6}" width="40" height="12" rx="2" fill="#e8f3ff" stroke="#bedaff" stroke-width="2"/>`;
    });
    mc += `<rect x="2" y="2" width="${W - 4}" height="${H - 4}" fill="none" stroke="#f759ab" stroke-width="6" rx="4"/>`;
    msvg.innerHTML = mc;
  }
}

// ============ 版本管理页面 ============
function openVersionPage(indicatorName) {
  const contentArea = document.getElementById('content-area');
  const name = indicatorName || '日完成生产订单总数';

  const versionData = [
    {
      time: '2025-12-22 17:32:49',
      operator: 'ShangsValley',
      dataStatus: '已锁定',
      onlineStatus: '未上线',
      auditStatus: '—',
      version: 'V2',
      isCurrent: false,
    },
    {
      time: '2025-12-17 10:28:46',
      operator: 'ShangsValley',
      dataStatus: '已锁定',
      onlineStatus: '已上线',
      auditStatus: '—',
      version: 'V1',
      isCurrent: true,
    },
  ];

  const rows = versionData.map(r => {
    const dataBadge = `<span class="badge badge-success">${r.dataStatus}</span>`;
    const onlineBadge = r.onlineStatus === '已上线'
      ? `<span class="badge badge-info">${r.onlineStatus}</span>`
      : `<span style="color:var(--text-tertiary)">${r.onlineStatus}</span>`;
    const verLabel = r.isCurrent ? `${r.version}（当前）` : r.version;

    let ops = `<a class="action-link" onclick="openIndicatorForm('edit')">编辑</a>
               <a class="action-link" onclick="openDataBindingPage()">数据绑定</a>`;
    if (!r.isCurrent) {
      ops += ` <a class="action-link" style="color:#ff7d00">更新上线</a>
               <a class="action-link" style="color:#f53f3f">删除</a>`;
    }

    return `<tr>
      <td>${r.time}</td>
      <td>${r.operator}</td>
      <td>${dataBadge}</td>
      <td>${onlineBadge}</td>
      <td>${r.auditStatus}</td>
      <td>${verLabel}</td>
      <td class="op-cell">${ops}</td>
    </tr>`;
  }).join('');

  contentArea.innerHTML = `
    <div class="edit-page">
      <div class="edit-page-header">
        <span class="edit-page-title">查看【${name}】记录</span>
        <div class="edit-page-actions">
          <button class="btn btn-sm" onclick="loadPage('indicator-mgmt')">返 回</button>
        </div>
      </div>
      <div class="edit-page-body" style="padding:0">
        <div class="ind-table-wrap" style="margin:0">
          <table class="data-table">
            <thead>
              <tr>
                <th>时间</th>
                <th>操作者</th>
                <th>数据状态</th>
                <th>上线状态</th>
                <th>审核状态</th>
                <th>版本</th>
                <th>操作</th>
              </tr>
            </thead>
            <tbody>${rows}</tbody>
          </table>
        </div>
        <div class="pagination" style="padding:12px 24px">
          <span class="page-info">总共 ${versionData.length} 条数据</span>
          <span class="page-nav">
            <span class="page-btn disabled">&lt;</span>
            <span class="page-btn active">1</span>
            <span class="page-btn disabled">&gt;</span>
          </span>
          <span class="page-size">10 条/页</span>
        </div>
      </div>
    </div>`;
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
  } else if (hash && pageConfig[hash]) {
    loadPage(hash);
  } else {
    loadPage('indicator-mgmt');
  }
});
