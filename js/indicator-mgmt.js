// 指标管理模块

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
