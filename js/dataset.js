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
          <button class="btn btn-primary btn-sm" onclick="openDatasetForm()">新建</button>
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
