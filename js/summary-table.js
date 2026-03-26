// 汇总表模块

var _summaryRows = [
  { code:'hui1',  name:'新建指标测算1',     eng:'daily_cmp_order',      alias:'日完成情况汇总',   belong:'输出业务层/test_dm', cycle:'日', status:'启动', exec:'执行成功' },
  { code:'hui2',  name:'员工人数汇总',      eng:'emp_count_summary',    alias:'员工人数统计',     belong:'输出业务层/hr_dm',   cycle:'月', status:'启动', exec:'执行成功' },
  { code:'hui3',  name:'营收月度汇总',      eng:'revenue_monthly',      alias:'月营收数据',       belong:'输出业务层/fin_dm',  cycle:'月', status:'启动', exec:'执行成功' },
  { code:'hui4',  name:'生产订单日报',      eng:'prod_order_daily',     alias:'日生产订单统计',   belong:'输出业务层/prod_dm', cycle:'日', status:'启动', exec:'执行失败' },
  { code:'hui5',  name:'设备运行汇总',      eng:'device_run_summary',   alias:'设备运行统计',     belong:'输出业务层/iot_dm',  cycle:'日', status:'停止', exec:'' },
  { code:'hui6',  name:'销售区域统计',      eng:'sales_region_stat',    alias:'区域销售数据',     belong:'输出业务层/sale_dm', cycle:'月', status:'启动', exec:'执行成功' },
  { code:'hui7',  name:'库存周转汇总',      eng:'inventory_turnover',   alias:'库存周转率',       belong:'输出业务层/wms_dm',  cycle:'周', status:'停止', exec:'' },
  { code:'hui8',  name:'质量检测日报',      eng:'quality_check_daily',  alias:'日质检汇总',       belong:'输出业务层/qa_dm',   cycle:'日', status:'启动', exec:'执行成功' },
  { code:'hui9',  name:'能耗月度统计',      eng:'energy_monthly',       alias:'月能耗汇总',       belong:'输出业务层/iot_dm',  cycle:'月', status:'启动', exec:'执行成功' },
  { code:'hui10', name:'客户满意度汇总',    eng:'cust_satisfaction',    alias:'客户满意度统计',   belong:'输出业务层/crm_dm',  cycle:'季', status:'停止', exec:'' },
];

function _buildSummaryRows() {
  return _summaryRows.map(function(r) {
    var statusBadge = r.status === '启动'
      ? '<span class="badge badge-green">启动</span>'
      : '<span class="badge badge-default">停止</span>';
    var execBadge = '';
    if (r.exec === '执行成功') execBadge = '<span class="badge badge-blue">执行成功</span>';
    else if (r.exec === '执行失败') execBadge = '<span class="badge badge-red">执行失败</span>';
    var stopOrStart = r.status === '启动'
      ? '<a class="action-link" style="color:#ff7d00" onclick="confirmAction(\'停止\',\'' + r.name + '\')">停止</a>'
      : '<a class="action-link" style="color:#3370ff" onclick="confirmAction(\'启动\',\'' + r.name + '\')">启动</a>';
    return '<tr>' +
      '<td><input type="checkbox"></td>' +
      '<td>' + r.code + '</td>' +
      '<td>' + r.name + '</td>' +
      '<td>' + r.eng + '</td>' +
      '<td>' + r.alias + '</td>' +
      '<td>' + r.belong + '</td>' +
      '<td>' + r.cycle + '</td>' +
      '<td>' + statusBadge + '</td>' +
      '<td>' + execBadge + '</td>' +
      '<td></td>' +
      '<td class="op-cell">' +
        stopOrStart +
        '<a class="action-link" onclick="openSummaryExecuteModal()">立即执行</a>' +
        '<a class="action-link" onclick="openSummaryForm()">编辑</a>' +
        '<span class="more-actions" onclick="toggleMoreMenu(this)">' +
          '<i class="fa-solid fa-ellipsis-vertical" style="font-size:14px"></i>' +
          '<div class="more-menu">' +
            '<a onclick="openSummaryForm(\'table\')">表信息</a>' +
            '<a onclick="openSummaryDataPreview(\'' + r.name + '\')">数据预览</a>' +
            '<a onclick="openSummaryForm(\'schedule\')">查看调度</a>' +
            '<a style="color:#ff7d00" onclick="confirmAction(\'清除数据\',\'' + r.name + '\')">清除数据</a>' +
            '<a style="color:#f53f3f" onclick="confirmDelete(\'' + r.name + '\')">删除</a>' +
          '</div>' +
        '</span>' +
      '</td>' +
    '</tr>';
  }).join('');
}

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
        <div class="category-tree" id="summary-tree"></div>
      </div>
      <div class="split-right">
        <div class="ind-tab-bar">
          <div class="ind-tab active"><i class="fa-regular fa-folder" style="color:#f90; margin-right:4px; font-size:12px"></i> 全部</div>
        </div>
        <div class="ind-toolbar">
          <button class="btn btn-primary btn-sm" onclick="openSummaryForm()">新建</button>
          <button class="btn btn-sm" style="background:#3370ff; color:#fff; border-color:#3370ff" onclick="confirmBatchAction('启动',1)">启动</button>
          <button class="btn btn-sm" style="background:#3370ff; color:#fff; border-color:#3370ff" onclick="confirmBatchAction('停止',1)">停止</button>
          <button class="btn btn-sm" style="background:#ff7d00; color:#fff; border-color:#ff7d00" onclick="confirmBatchAction('清除数据',1)">清除数据</button>
          <button class="btn btn-sm" style="background:#f53f3f; color:#fff; border-color:#f53f3f" onclick="confirmBatchDelete(1)">删除</button>
          <button class="btn btn-sm" onclick="openStorageConfigModal()"><i class="fa-solid fa-database"></i> 存储配置</button>
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
              ${_buildSummaryRows()}
            </tbody>
          </table>
          <div class="pagination">
            <span class="page-info">总共 36 条数据</span>
            <div class="page-btn"><i class="fa-solid fa-chevron-left"></i></div>
            <div class="page-btn active">1</div>
            <div class="page-btn">2</div>
            <div class="page-btn"><i class="fa-solid fa-chevron-right"></i></div>
            <span class="page-info" style="margin-left:8px">10 条/页</span>
          </div>
        </div>
      </div>
    </div>`;
  buildCommonCatTree('summary-tree');
}

// ============ 汇总表新建/编辑页面 ============
function openSummaryForm(initialTab) {
  var tab = initialTab || 'data';
  var contentArea = document.getElementById('content-area');
  contentArea.innerHTML =
    '<div class="edit-page" style="display:flex; flex-direction:column; height:100%">' +
      '<div class="summary-tabs">' +
        '<div class="summary-tab' + (tab==='data'?' active':'') + '" onclick="switchSummaryTab(this,\'data\')">数据信息</div>' +
        '<div class="summary-tab' + (tab==='table'?' active':'') + '" onclick="switchSummaryTab(this,\'table\')">表信息</div>' +
        '<div class="summary-tab' + (tab==='schedule'?' active':'') + '" onclick="switchSummaryTab(this,\'schedule\')">调度信息</div>' +
        '<div style="flex:1"></div>' +
        '<button class="btn btn-sm" onclick="loadPage(\'summary-table\')">返 回</button>' +
      '</div>' +
      '<div id="summary-tab-content" style="flex:1; overflow-y:auto"></div>' +
    '</div>';
  if (tab === 'table') renderSummaryTableTab();
  else if (tab === 'schedule') renderSummaryScheduleTab();
  else renderSummaryDataTab();
}

function switchSummaryTab(el, tab) {
  el.parentElement.querySelectorAll('.summary-tab').forEach(t => t.classList.remove('active'));
  el.classList.add('active');
  if (tab === 'data') renderSummaryDataTab();
  else if (tab === 'table') renderSummaryTableTab();
  else if (tab === 'schedule') renderSummaryScheduleTab();
}

function renderSummaryDataTab() {
  document.getElementById('summary-tab-content').innerHTML =
    '<div style="display:flex; height:100%; min-height:520px">' +
      '<div class="summary-data-left" style="min-width:340px;">' +
        '<div class="summary-ind-list" style="padding:16px 20px;">' +
          '<div class="summary-ind-item" style="display:flex;align-items:center;gap:10px;padding:8px 0;font-size:14px;"><span class="summary-ind-num">1</span> 职工人数</div>' +
          '<div class="summary-ind-item" style="display:flex;align-items:center;gap:10px;padding:8px 0;font-size:14px;"><span class="summary-ind-num">2</span> 在岗职工人数</div>' +
          '<div class="summary-ind-item" style="display:flex;align-items:center;gap:10px;padding:8px 0;font-size:14px;"><span class="summary-ind-num">3</span> 在岗职工人数占职工总人数的比重</div>' +
          '<div class="summary-ind-item" style="display:flex;align-items:center;gap:10px;padding:8px 0;font-size:14px;cursor:pointer;" onclick="openSummarySelectIndicator()">' +
            '<span class="summary-ind-num" style="background:#1890ff;color:#fff;"><i class="fa-solid fa-plus" style="font-size:10px;"></i></span> <a class="action-link" style="font-size:14px;">指标</a>' +
          '</div>' +
        '</div>' +

        '<div style="padding:4px 20px 12px 20px;border-top:1px solid #f0f0f0;">' +
          '<div style="display:flex;align-items:center;gap:8px;margin-bottom:12px;flex-wrap:wrap;">' +
            '<span style="font-size:13px;color:#333;flex-shrink:0;">汇总表维度:</span>' +
            '<span style="display:inline-flex;align-items:center;gap:4px;background:#f5f5f5;border:1px solid #e8e8e8;border-radius:4px;padding:2px 8px;font-size:12px;color:#333;">人员分类 <i class="fa-solid fa-xmark" style="font-size:10px;color:#999;cursor:pointer;"></i></span>' +
            '<i class="fa-solid fa-plus" style="color:#1890ff;cursor:pointer;font-size:13px;" onclick="toggleSummaryDimGroup(this)"></i>' +
          '</div>' +

          '<div style="display:flex;align-items:center;gap:6px;margin-bottom:6px;flex-wrap:wrap;">' +
            '<span style="font-size:13px;color:#333;">按</span>' +
            '<span style="background:#e8f4ff;color:#1890ff;border:1px solid #91caff;border-radius:3px;padding:1px 6px;font-size:11px;">指标</span>' +
            '<select class="form-control form-select" style="width:120px;font-size:12px;" id="summary-sort-field">' +
              '<option>职工人数</option><option>在岗职工人数</option><option>在岗职工人数占职...</option>' +
            '</select>' +
            '<span style="font-size:13px;color:#333;">进行</span>' +
            '<select class="form-control form-select" style="width:70px;font-size:12px;">' +
              '<option>升序</option><option>降序</option>' +
            '</select>' +
            '<i class="fa-solid fa-xmark" style="color:#999;cursor:pointer;font-size:12px;"></i>' +
          '</div>' +
          '<div style="margin-bottom:12px;">' +
            '<a class="action-link" style="font-size:13px;" onclick="addSummarySortRule()"><i class="fa-solid fa-plus" style="margin-right:4px;"></i>排序规则</a>' +
          '</div>' +
        '</div>' +

        '<div style="padding:0 20px 16px 20px;border-top:1px solid #f0f0f0;">' +
          '<div style="display:flex;align-items:center;gap:6px;margin:12px 0 10px 0;">' +
            '<span style="font-size:13px;color:#333;width:80px;flex-shrink:0;">执行机制:</span>' +
            '<select class="form-control form-select" style="width:70px;font-size:12px;"><option>每月</option><option>每天</option><option>每周</option></select>' +
            '<select class="form-control form-select" style="width:60px;font-size:12px;"><option>5号</option><option>1号</option><option>10号</option><option>15号</option></select>' +
            '<input type="text" class="form-control" value="15:11:00" style="width:85px;font-size:12px;">' +
            '<i class="fa-regular fa-clock" style="color:#bbb;font-size:13px;"></i>' +
          '</div>' +
          '<div style="font-size:13px;color:#666;margin-bottom:8px;">数据时间范围:</div>' +
          '<div style="display:flex;align-items:center;gap:6px;margin-bottom:8px;">' +
            '<span style="font-size:13px;color:#333;width:80px;flex-shrink:0;">开始时间:</span>' +
            '<select class="form-control form-select" style="width:70px;font-size:12px;"><option>上一月</option><option>当月</option></select>' +
            '<select class="form-control form-select" style="width:60px;font-size:12px;"><option>5号</option><option>1号</option></select>' +
            '<input type="text" class="form-control" value="00:00:00" style="width:85px;font-size:12px;">' +
            '<i class="fa-regular fa-clock" style="color:#bbb;font-size:13px;"></i>' +
          '</div>' +
          '<div style="display:flex;align-items:center;gap:6px;margin-bottom:8px;">' +
            '<span style="font-size:13px;color:#333;width:80px;flex-shrink:0;">结束时间:</span>' +
            '<select class="form-control form-select" style="width:70px;font-size:12px;"><option>本月</option><option>下一月</option></select>' +
            '<select class="form-control form-select" style="width:60px;font-size:12px;"><option>4号</option><option>1号</option></select>' +
            '<input type="text" class="form-control" value="00:00:00" style="width:85px;font-size:12px;">' +
            '<i class="fa-regular fa-clock" style="color:#bbb;font-size:13px;"></i>' +
          '</div>' +
          '<div style="display:flex;align-items:center;gap:6px;margin-bottom:12px;">' +
            '<span style="font-size:13px;color:#333;width:80px;flex-shrink:0;">首次补录时间:</span>' +
            '<input type="text" class="form-control" value="2022-02-01 23:59:59" style="width:160px;font-size:12px;">' +
            '<i class="fa-regular fa-calendar" style="color:#bbb;font-size:13px;"></i>' +
            '<i class="fa-regular fa-clock" style="color:#bbb;font-size:13px;"></i>' +
          '</div>' +
        '</div>' +
        '<div style="padding:8px 20px 16px;display:flex;gap:8px;justify-content:center;">' +
          '<button class="btn btn-primary btn-sm" style="min-width:70px;" onclick="document.querySelectorAll(\'.summary-tab\')[1].click()">下一步</button>' +
          '<button class="btn btn-primary btn-sm" style="min-width:70px;" onclick="loadPage(\'summary-table\')">保存</button>' +
        '</div>' +
      '</div>' +

      '<div class="summary-data-right">' +
        '<div style="display:flex;align-items:center;justify-content:space-between;padding:12px 20px;border-bottom:1px solid #e8e8e8;">' +
          '<span style="font-size:14px;font-weight:500;">员工人数汇总 <i class="fa-regular fa-pen-to-square" style="color:#bbb;margin-left:6px;cursor:pointer;font-size:13px;"></i></span>' +
          '<div style="display:flex;gap:16px;font-size:13px;">' +
            '<a class="action-link"><i class="fa-regular fa-eye" style="margin-right:4px;color:#1890ff;"></i>sql预览</a>' +
            '<a class="action-link"><i class="fa-solid fa-download" style="margin-right:4px;"></i>下载</a>' +
          '</div>' +
        '</div>' +
        '<div style="padding:0;overflow:auto;flex:1;">' +
          '<table class="data-table">' +
            '<thead><tr><th>时间列</th><th>人员分类</th><th>职工人数</th><th>在岗职工人数</th><th style="min-width:180px;">在岗职工人数占职工总人数的比重</th></tr></thead>' +
            '<tbody><tr><td>2026-03</td><td>0</td><td>1</td><td>1</td><td>100.00</td></tr></tbody>' +
          '</table>' +
          '<div class="pagination" style="padding:12px 16px;">' +
            '<span class="page-info">总共 1 条数据</span>' +
            '<span class="page-info" style="margin-left:auto;">< <span class="page-btn active" style="margin:0 4px;">1</span> > &nbsp; 10 条/页</span>' +
          '</div>' +
        '</div>' +
      '</div>' +
    '</div>';
}

function renderSummaryTableTab() {
  document.getElementById('summary-tab-content').innerHTML = `
    <div style="padding:20px 24px; overflow-y:auto">
      <div class="dim-form-row" style="margin-bottom:16px">
        <label class="dim-form-label" style="width:80px">建表机制：</label>
        <div class="dim-form-field"><select id="summary-table-mechanism" class="form-control form-select" style="max-width:160px" onchange="switchSummaryTableMechanism(this.value)"><option value="new">新建表</option><option value="existing">已有表</option></select></div>
      </div>
      <div id="summary-table-form-area"></div>
      <div style="padding:16px 0; display:flex; gap:8px">
        <button class="btn btn-primary btn-sm" onclick="document.querySelectorAll('.summary-tab')[0].click()">上一步</button>
        <button class="btn btn-primary btn-sm" onclick="loadPage('summary-table')">保存</button>
      </div>
    </div>`;
  switchSummaryTableMechanism('new');
}

function switchSummaryTableMechanism(type) {
  var area = document.getElementById('summary-table-form-area');
  if (!area) return;
  if (type === 'new') {
    area.innerHTML = _buildSummaryNewTableForm();
  } else {
    area.innerHTML = _buildSummaryExistingTableForm();
  }
}

function _buildSummaryNewTableForm() {
  return `
      <div class="section-title" style="margin-bottom:16px">基础信息</div>
      <div class="form-grid">
        <div class="form-row">
          <div class="form-cell">
            <div class="form-group"><label class="form-label required">数据源</label><div class="form-field"><div style="position:relative;" id="summary-ds-tree-wrap-new"><div style="display:flex;align-items:center;border:1px solid #d9d9d9;border-radius:4px;padding:0 10px;height:32px;background:#fff;cursor:pointer;" onclick="toggleSummaryDsTree('new')"><input type="text" id="summary-ds-input-new" placeholder="请选择数据源" readonly value="default" style="flex:1;border:none;outline:none;font-size:13px;background:transparent;cursor:pointer;color:var(--text-primary);"><i class="fa-solid fa-angle-down" style="color:#c9cdd4;font-size:13px;"></i></div></div></div></div>
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
              <td><a class="action-link" style="color:#f53f3f; font-size:12px" onclick="confirmDelete('生产订单数量')">删除</a></td>
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
              <td><a class="action-link" style="color:#f53f3f; font-size:12px" onclick="confirmDelete('生产订单总数')">删除</a></td>
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
              <td><a class="action-link" style="color:#f53f3f; font-size:12px" onclick="confirmDelete('日计划完成率')">删除</a></td>
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
              <td><a class="action-link" style="color:#f53f3f; font-size:12px" onclick="confirmDelete('日完成生产订单总数')">删除</a></td>
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
      </div>`;
}

function _buildSummaryExistingTableForm() {
  var ds = 'disabled style="font-size:12px;background:#f5f5f5;color:#999;cursor:not-allowed;"';
  var di = 'disabled style="font-size:12px;background:#f5f5f5;color:#999;cursor:not-allowed;"';
  var dc = 'disabled style="accent-color:#ccc;cursor:not-allowed;"';
  return `
      <div class="section-title" style="margin-bottom:16px">基础信息</div>
      <div class="form-grid">
        <div class="form-row">
          <div class="form-cell">
            <div class="form-group"><label class="form-label required">数据源</label><div class="form-field"><div style="position:relative;" id="summary-ds-tree-wrap-exist"><div style="display:flex;align-items:center;border:1px solid #d9d9d9;border-radius:4px;padding:0 10px;height:32px;background:#fff;cursor:pointer;" onclick="toggleSummaryDsTree('exist')"><input type="text" id="summary-ds-input-exist" placeholder="请选择数据源" readonly value="default" style="flex:1;border:none;outline:none;font-size:13px;background:transparent;cursor:pointer;color:var(--text-primary);"><i class="fa-solid fa-angle-down" style="color:#c9cdd4;font-size:13px;"></i></div></div></div></div>
          </div>
          <div class="form-cell">
            <div class="form-group"><label class="form-label">表选择</label><div class="form-field" style="display:flex;gap:6px;align-items:center"><select class="form-control form-select"><option>ads_trans_stats</option><option>ads_user_stats</option><option>ads_order_summary</option></select><i class="fa-solid fa-rotate" style="color:var(--primary-color);cursor:pointer" title="刷新"></i></div></div>
          </div>
        </div>
        <div class="form-row">
          <div class="form-cell">
            <div class="form-group"><label class="form-label required">编码</label><div class="form-field"><input type="text" class="form-control" value="sum1"></div></div>
          </div>
          <div class="form-cell">
            <div class="form-group"><label class="form-label">英文名</label><div class="form-field"><input type="text" class="form-control" value="ads_trans_stats" readonly style="background:#f7f8fa"></div></div>
          </div>
        </div>
        <div class="form-row">
          <div class="form-cell">
            <div class="form-group"><label class="form-label required">所属分类</label><div class="form-field"><select class="form-control form-select"><option>指标体系</option></select></div></div>
          </div>
          <div class="form-cell">
            <div class="form-group"><label class="form-label required">表选名</label><div class="form-field"><input type="text" class="form-control" value="ads_trans_order_stats" style="border-color:#f53f3f"><div style="color:#f53f3f;font-size:12px;margin-top:4px">请输入表别称</div></div></div>
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
              <th>操作 <i class="fa-regular fa-circle-question" style="color:#86909c;margin-left:2px"></i></th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td><i class="fa-solid fa-grip-vertical" style="color:#c9cdd4; cursor:grab"></i></td>
              <td><select class="form-control form-select" style="font-size:12px"><option>时间列</option><option>在岗人数</option><option>在岗职工人数</option><option>在岗职工人数占职工总人数的比重</option></select></td>
              <td><input class="form-control" value="ds" ${di}></td>
              <td><input class="form-control" value="流" ${di}></td>
              <td><select class="form-control form-select" ${ds}><option>varchar</option></select></td>
              <td><input class="form-control" value="" ${di}></td>
              <td><input class="form-control" value="" ${di}></td>
              <td><input class="form-control" value="" ${di}></td>
              <td style="white-space:nowrap"><label style="font-size:12px"><input type="checkbox" checked ${dc}> 非空</label> <label style="font-size:12px"><input type="checkbox" ${dc}> 主键</label> <label style="font-size:12px"><input type="checkbox" ${dc}> 自增长</label></td>
              <td><input class="form-control" value="" ${di}></td>
              <td><span style="color:#ccc;font-size:12px;">删除</span></td>
            </tr>
            <tr>
              <td><i class="fa-solid fa-grip-vertical" style="color:#c9cdd4; cursor:grab"></i></td>
              <td><select class="form-control form-select" style="font-size:12px"><option>在工人数</option></select></td>
              <td><input class="form-control" value="reward_days" ${di}></td>
              <td><input class="form-control" value="reward_days" ${di}></td>
              <td><select class="form-control form-select" ${ds}><option>service</option></select></td>
              <td><input class="form-control" value="" ${di}></td>
              <td><input class="form-control" value="" ${di}></td>
              <td><input class="form-control" value="" ${di}></td>
              <td style="white-space:nowrap"><label style="font-size:12px"><input type="checkbox" ${dc}> 非空</label> <label style="font-size:12px"><input type="checkbox" ${dc}> 主键</label> <label style="font-size:12px"><input type="checkbox" ${dc}> 自增长</label></td>
              <td><input class="form-control" value="对应字符串描述" ${di}></td>
              <td><span style="color:#ccc;font-size:12px;">删除</span></td>
            </tr>
            <tr>
              <td><i class="fa-solid fa-grip-vertical" style="color:#c9cdd4; cursor:grab"></i></td>
              <td><select class="form-control form-select" style="font-size:12px"><option>公购订工人数</option></select></td>
              <td><input class="form-control" value="dispatch_order_count" ${di}></td>
              <td><input class="form-control" value="dispatch_order_count" ${di}></td>
              <td><select class="form-control form-select" ${ds}><option>bigint</option></select></td>
              <td><input class="form-control" value="" ${di}></td>
              <td><input class="form-control" value="" ${di}></td>
              <td><input class="form-control" value="" ${di}></td>
              <td style="white-space:nowrap"><label style="font-size:12px"><input type="checkbox" ${dc}> 非空</label> <label style="font-size:12px"><input type="checkbox" ${dc}> 主键</label> <label style="font-size:12px"><input type="checkbox" ${dc}> 自增长</label></td>
              <td><input class="form-control" value="" ${di}></td>
              <td><span style="color:#ccc;font-size:12px;">删除</span></td>
            </tr>
            <tr>
              <td><i class="fa-solid fa-grip-vertical" style="color:#c9cdd4; cursor:grab"></i></td>
              <td><select class="form-control form-select" style="font-size:12px"><option>在岗职工人数占职工总人数的比重</option></select></td>
              <td><input class="form-control" value="revenue_order_amount" ${di}></td>
              <td><input class="form-control" value="revenue_order_amount" ${di}></td>
              <td><select class="form-control form-select" ${ds}><option>decimal</option></select></td>
              <td><input class="form-control" value="" ${di}></td>
              <td><input class="form-control" value="" ${di}></td>
              <td><input class="form-control" value="" ${di}></td>
              <td style="white-space:nowrap"><label style="font-size:12px"><input type="checkbox" ${dc}> 非空</label> <label style="font-size:12px"><input type="checkbox" ${dc}> 主键</label> <label style="font-size:12px"><input type="checkbox" ${dc}> 自增长</label></td>
              <td><input class="form-control" value="" ${di}></td>
              <td><span style="color:#ccc;font-size:12px;">删除</span></td>
            </tr>
            <tr>
              <td><i class="fa-solid fa-grip-vertical" style="color:#c9cdd4; cursor:grab"></i></td>
              <td><select class="form-control form-select" style="font-size:12px"><option>请选择</option></select></td>
              <td><input class="form-control" value="rtu_pt" ${di}></td>
              <td><input class="form-control" value="rtu_pt" ${di}></td>
              <td><select class="form-control form-select" ${ds}><option>varchar</option></select></td>
              <td><input class="form-control" value="" ${di}></td>
              <td><input class="form-control" value="" ${di}></td>
              <td><input class="form-control" value="" ${di}></td>
              <td style="white-space:nowrap"><label style="font-size:12px"><input type="checkbox" ${dc}> 非空</label> <label style="font-size:12px"><input type="checkbox" ${dc}> 主键</label> <label style="font-size:12px"><input type="checkbox" ${dc}> 自增长</label></td>
              <td><input class="form-control" value="20位字符描述内容" ${di}></td>
              <td><span style="color:#ccc;font-size:12px;">删除</span></td>
            </tr>
            <tr>
              <td><i class="fa-solid fa-grip-vertical" style="color:#c9cdd4; cursor:grab"></i></td>
              <td><select class="form-control form-select" style="font-size:12px"><option>请选择</option></select></td>
              <td><input class="form-control" value="biz_by" ${di}></td>
              <td><input class="form-control" value="biz_by" ${di}></td>
              <td><select class="form-control form-select" ${ds}><option>varchar</option></select></td>
              <td><input class="form-control" value="" ${di}></td>
              <td><input class="form-control" value="" ${di}></td>
              <td><input class="form-control" value="" ${di}></td>
              <td style="white-space:nowrap"><label style="font-size:12px"><input type="checkbox" ${dc}> 非空</label> <label style="font-size:12px"><input type="checkbox" ${dc}> 主键</label> <label style="font-size:12px"><input type="checkbox" ${dc}> 自增长</label></td>
              <td><input class="form-control" value="20位字符描述内容" ${di}></td>
              <td><span style="color:#ccc;font-size:12px;">删除</span></td>
            </tr>
          </tbody>
        </table>
      </div>`;
}

// ============ 存储配置弹窗 ============
function openStorageConfigModal() {
  var treeData = [
    { name: '数据分析_君兰数据库', icon: 'db-group', children: [
      { name: 'dfs_metrics', icon: 'table' },
      { name: 'xianshangku', icon: 'table' },
    ]},
    { name: '输出业务层', icon: 'db-group', children: [
      { name: 'aierp_pro_test02', icon: 'db-schema', children: [
        { name: 'aierp_pro_test02', icon: 'db-table-group', children: [
          { name: 'aierp_pro_test02', icon: 'table' },
        ]},
      ]},
      { name: 'test_dm', icon: 'table', selected: true },
      { name: 'tms_demo', icon: 'table' },
    ]},
  ];

  function iconSvg(type) {
    if (type === 'db-group') {
      return '<svg viewBox="0 0 20 20" width="16" height="16"><ellipse cx="10" cy="5" rx="8" ry="3" fill="#4a90d9"/><path d="M2 5v4c0 1.7 3.6 3 8 3s8-1.3 8-3V5" fill="none" stroke="#4a90d9" stroke-width="1.2"/><path d="M2 9v4c0 1.7 3.6 3 8 3s8-1.3 8-3V9" fill="none" stroke="#4a90d9" stroke-width="1.2"/></svg>';
    } else if (type === 'db-schema') {
      return '<svg viewBox="0 0 20 20" width="16" height="16"><ellipse cx="10" cy="5" rx="7" ry="2.5" fill="#f5a623"/><path d="M3 5v4c0 1.4 3.1 2.5 7 2.5s7-1.1 7-2.5V5" fill="none" stroke="#f5a623" stroke-width="1.2"/><path d="M3 9v4c0 1.4 3.1 2.5 7 2.5s7-1.1 7-2.5V9" fill="none" stroke="#f5a623" stroke-width="1.2"/></svg>';
    } else if (type === 'db-table-group') {
      return '<svg viewBox="0 0 20 20" width="16" height="16"><rect x="2" y="3" width="16" height="14" rx="2" fill="none" stroke="#4a90d9" stroke-width="1.3"/><line x1="2" y1="7" x2="18" y2="7" stroke="#4a90d9" stroke-width="1"/><line x1="8" y1="7" x2="8" y2="17" stroke="#4a90d9" stroke-width="1"/></svg>';
    } else {
      return '<svg viewBox="0 0 20 20" width="16" height="16"><ellipse cx="10" cy="5" rx="6" ry="2" fill="#f5c542"/><path d="M4 5v4c0 1.1 2.7 2 6 2s6-.9 6-2V5" fill="none" stroke="#daa520" stroke-width="1"/><path d="M4 9v4c0 1.1 2.7 2 6 2s6-.9 6-2V9" fill="none" stroke="#daa520" stroke-width="1"/></svg>';
    }
  }

  function renderNode(node, depth) {
    var indent = depth * 20;
    var hasChildren = node.children && node.children.length > 0;
    var sel = node.selected ? 'background:#e6f7ff; border-radius:4px;' : '';
    var nameColor = node.selected ? 'color:#1890ff; font-weight:500;' : 'color:#333;';
    var html = '<div style="display:flex; align-items:center; gap:6px; padding:4px 8px; padding-left:' + (indent + 8) + 'px; cursor:pointer; ' + sel + '" onclick="this.parentElement.querySelectorAll(\'[data-sel]\').forEach(function(d){d.style.background=\'\';d.removeAttribute(\'data-sel\')}); this.style.background=\'#e6f7ff\'; this.setAttribute(\'data-sel\',\'1\');">';
    if (hasChildren) {
      html += '<i class="fa-solid fa-caret-down" style="font-size:10px; color:#999; width:12px;"></i>';
    } else {
      html += '<span style="width:12px;"></span>';
    }
    html += '<span style="display:flex; align-items:center;">' + iconSvg(node.icon) + '</span>';
    html += '<span style="font-size:13px; ' + nameColor + '">' + node.name + '</span>';
    html += '</div>';
    if (hasChildren) {
      node.children.forEach(function(c) { html += renderNode(c, depth + 1); });
    }
    return html;
  }

  var treeHtml = '';
  treeData.forEach(function(n) { treeHtml += renderNode(n, 0); });

  var overlay = document.createElement('div');
  overlay.id = 'storage-config-overlay';
  overlay.style.cssText = 'position:fixed;top:0;left:0;width:100%;height:100%;background:rgba(0,0,0,.45);z-index:2000;display:flex;align-items:center;justify-content:center';
  overlay.innerHTML =
    '<div style="background:#fff;border-radius:8px;width:560px;max-height:80vh;display:flex;flex-direction:column;box-shadow:0 8px 24px rgba(0,0,0,.15)" onclick="event.stopPropagation()">' +
      '<div style="display:flex;align-items:center;justify-content:space-between;padding:16px 24px;border-bottom:1px solid #e5e6eb">' +
        '<span style="font-size:16px;font-weight:600;color:#1d2129">存储配置</span>' +
        '<i class="fa-solid fa-xmark" style="cursor:pointer;color:#86909c;font-size:16px" onclick="closeStorageConfigModal()"></i>' +
      '</div>' +
      '<div style="flex:1;padding:24px;overflow-y:auto">' +
        '<h3 style="font-size:15px;font-weight:600;color:#333;margin:0 0 20px 0">数据库配置：</h3>' +
        '<div style="display:flex;align-items:flex-start;gap:12px">' +
          '<label style="font-size:14px;color:#333;white-space:nowrap;line-height:32px">汇总表数据库：</label>' +
          '<div style="flex:1">' +
            '<div style="position:relative;margin-bottom:4px">' +
              '<input type="text" value="test_dm" style="width:100%;height:32px;border:1px solid #d9d9d9;border-radius:4px;padding:0 32px 0 10px;font-size:13px;color:#333;outline:none;box-sizing:border-box" />' +
              '<i class="fa-solid fa-search" style="position:absolute;right:10px;top:50%;transform:translateY(-50%);color:#bbb;font-size:13px;pointer-events:none"></i>' +
            '</div>' +
            '<div style="border:1px solid #e8e8e8;border-radius:4px;max-height:280px;overflow-y:auto;padding:6px 0;box-shadow:0 2px 8px rgba(0,0,0,0.08)">' +
              treeHtml +
            '</div>' +
          '</div>' +
        '</div>' +
      '</div>' +
      '<div style="display:flex;justify-content:flex-end;gap:8px;padding:12px 24px;border-top:1px solid #e5e6eb">' +
        '<button class="btn btn-sm" onclick="closeStorageConfigModal()" style="min-width:64px;height:32px">取 消</button>' +
        '<button class="btn btn-primary btn-sm" onclick="closeStorageConfigModal()" style="min-width:64px;height:32px">确 定</button>' +
      '</div>' +
    '</div>';
  document.body.appendChild(overlay);
  overlay.addEventListener('click', function() { closeStorageConfigModal(); });
}

function closeStorageConfigModal() {
  var el = document.getElementById('storage-config-overlay');
  if (el) el.remove();
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
        <i class="fa-regular fa-eye action-icon" title="查看" onclick="openSummaryLogModal()" style="cursor:pointer"></i>
        <i class="fa-regular fa-file-lines action-icon" title="日志" onclick="openSummaryLogModal()" style="cursor:pointer"></i>
      </td>
    </tr>`).join('');

  document.getElementById('summary-tab-content').innerHTML = `
    <div style="padding:16px 20px; overflow-y:auto">
      <div style="display:flex; align-items:center; gap:12px; margin-bottom:16px">
        <select class="form-control form-select" style="width:140px"><option>请选择状态</option><option>执行成功</option><option>执行失败</option></select>
        <span style="font-size:13px; color:var(--text-secondary)">下次调度执行时间: 2026-03-04 18:20:00</span>
        <button class="btn btn-primary btn-sm" onclick="openSummaryBackfillModal()">数据补录</button>
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

// ============ 汇总表 - 选择指标弹窗 ============
function openSummarySelectIndicator() {
  var overlay = document.createElement('div');
  overlay.id = 'summary-ind-modal-overlay';
  overlay.style.cssText = 'position:fixed;top:0;left:0;right:0;bottom:0;background:rgba(0,0,0,.45);z-index:1000;display:flex;align-items:center;justify-content:center;';

  var indicators = [
    { code:'CRH000_ID_010003...', name:'在岗职工人数占职...', checked:true, ratio:false },
    { code:'CRH000_ID_010003...', name:'在岗职工人数', checked:true, ratio:true },
    { code:'CRH000_ID_010001...', name:'职工人数', checked:true, ratio:false },
    { code:'000021', name:'日完成占比', checked:false, ratio:false },
    { code:'000019', name:'日完成生产订单', checked:false, ratio:true },
    { code:'000018', name:'生产订单', checked:false, ratio:false },
    { code:'000011', name:'日完成生产订单总数', checked:false, ratio:true },
    { code:'000009', name:'生产订单总数', checked:false, ratio:false },
    { code:'000005', name:'日计划完成率', checked:false, ratio:true },
  ];

  var rowsHtml = indicators.map(function(ind) {
    var chk = ind.checked ? ' checked' : '';
    var ratioHtml = ind.ratio ? '<span style="margin-left:12px;font-size:12px;"><input type="checkbox" style="margin-right:2px;accent-color:#1890ff;">同比</span><span style="margin-left:8px;font-size:12px;"><input type="checkbox" style="margin-right:2px;accent-color:#1890ff;">环比</span>' : '';
    return '<tr style="' + (ind.checked ? 'background:#e6f7ff;' : '') + '">' +
      '<td style="width:30px;"><input type="checkbox"' + chk + ' style="accent-color:#1890ff;"></td>' +
      '<td style="font-size:12px;color:#666;">' + ind.code + '</td>' +
      '<td style="font-size:12px;color:#333;">' + ind.name + '</td>' +
      '<td>' + ratioHtml + '</td>' +
      '<td style="font-size:12px;color:#999;"></td>' +
    '</tr>';
  }).join('');

  overlay.innerHTML =
    '<div style="background:#fff;border-radius:8px;width:800px;max-height:80vh;display:flex;flex-direction:column;box-shadow:0 8px 30px rgba(0,0,0,.2);">' +
      '<div style="display:flex;align-items:center;justify-content:space-between;padding:16px 20px;border-bottom:1px solid #e8e8e8;">' +
        '<span style="font-size:15px;font-weight:600;">选择指标</span>' +
        '<i class="fa-solid fa-xmark" style="color:#999;cursor:pointer;font-size:16px;" onclick="closeSummaryIndModal()"></i>' +
      '</div>' +
      '<div style="display:flex;flex:1;overflow:hidden;">' +
        '<div style="width:160px;border-right:1px solid #f0f0f0;padding:12px 0;overflow-y:auto;">' +
          '<div style="padding:6px 16px;font-size:13px;color:#1890ff;cursor:pointer;display:flex;align-items:center;gap:6px;background:#e6f7ff;"><i class="fa-solid fa-folder" style="color:#f5a623;"></i> 全部</div>' +
          '<div style="padding:6px 16px 6px 24px;font-size:13px;color:#333;cursor:pointer;display:flex;align-items:center;gap:6px;"><i class="fa-solid fa-folder" style="color:#f5a623;font-size:12px;"></i> 财务数据指标</div>' +
          '<div style="padding:6px 16px 6px 24px;font-size:13px;color:#333;cursor:pointer;display:flex;align-items:center;gap:6px;"><i class="fa-solid fa-folder" style="color:#f5a623;font-size:12px;"></i> 指标体系</div>' +
          '<div style="padding:6px 16px 6px 24px;font-size:13px;color:#333;cursor:pointer;display:flex;align-items:center;gap:6px;"><i class="fa-solid fa-folder" style="color:#f5a623;font-size:12px;"></i> 华润集团</div>' +
          '<div style="padding:6px 16px 6px 24px;font-size:13px;color:#333;cursor:pointer;display:flex;align-items:center;gap:6px;"><i class="fa-solid fa-folder" style="color:#f5a623;font-size:12px;"></i> 人力资源</div>' +
        '</div>' +
        '<div style="flex:1;display:flex;flex-direction:column;overflow:hidden;">' +
          '<div style="padding:12px 16px;display:flex;align-items:center;gap:8px;border-bottom:1px solid #f0f0f0;">' +
            '<input type="text" class="form-control" placeholder="名称或编码" style="flex:1;font-size:12px;">' +
            '<button class="btn btn-primary btn-sm" style="min-width:50px;">查询</button>' +
          '</div>' +
          '<div style="flex:1;overflow-y:auto;padding:0;">' +
            '<table class="data-table" style="font-size:13px;">' +
              '<thead><tr><th style="width:30px;"><input type="checkbox" style="accent-color:#1890ff;"></th><th>指标编码</th><th>指标名称</th><th>同环比</th><th>描述</th></tr></thead>' +
              '<tbody>' + rowsHtml + '</tbody>' +
            '</table>' +
          '</div>' +
        '</div>' +
      '</div>' +
      '<div style="display:flex;justify-content:flex-end;gap:8px;padding:12px 20px;border-top:1px solid #e8e8e8;">' +
        '<button class="btn btn-sm" onclick="closeSummaryIndModal()">取消</button>' +
        '<button class="btn btn-primary btn-sm" onclick="closeSummaryIndModal()">确定</button>' +
      '</div>' +
    '</div>';

  document.body.appendChild(overlay);
}

function closeSummaryIndModal() {
  var m = document.getElementById('summary-ind-modal-overlay');
  if (m) m.remove();
}

// ============ 汇总表 - 分组选择下拉 ============
function toggleSummaryDimGroup(trigger) {
  var existingId = 'summary-dim-group-dd';
  var existing = document.getElementById(existingId);
  if (existing) { existing.remove(); return; }

  var dd = document.createElement('div');
  dd.id = existingId;
  dd.style.cssText = 'position:fixed;z-index:600;background:#fff;border:1px solid #e8e8e8;border-radius:8px;box-shadow:0 4px 16px rgba(0,0,0,.15);width:260px;padding:16px;';

  var rect = trigger.getBoundingClientRect();
  dd.style.left = rect.left + 'px';
  dd.style.top = (rect.bottom + 4) + 'px';

  dd.innerHTML =
    '<div style="font-size:14px;font-weight:600;color:#333;margin-bottom:12px;">分组选择</div>' +
    '<div style="display:flex;align-items:center;gap:6px;border:1px solid #d9d9d9;border-radius:4px;padding:0 8px;height:32px;margin-bottom:12px;">' +
      '<input type="text" placeholder="搜索" style="border:none;outline:none;flex:1;font-size:13px;color:#333;" onclick="event.stopPropagation();">' +
      '<i class="fa-solid fa-magnifying-glass" style="color:#bbb;font-size:12px;"></i>' +
    '</div>' +
    '<div style="max-height:200px;overflow-y:auto;">' +
      '<div style="display:flex;align-items:center;gap:5px;padding:4px 0;font-size:13px;color:#999;cursor:default;">' +
        '<i class="fa-solid fa-caret-down" style="font-size:10px;color:#999;width:10px;"></i> 华润</div>' +
      '<div style="padding-left:16px;">' +
        '<div style="display:flex;align-items:center;gap:5px;padding:4px 0;font-size:13px;color:#999;cursor:default;">' +
          '<i class="fa-solid fa-caret-down" style="font-size:10px;color:#999;width:10px;"></i> <span style="font-weight:500;color:#333;">指标体系</span></div>' +
        '<div style="padding:4px 0 4px 24px;font-size:13px;color:#666;cursor:pointer;" onmouseover="this.style.color=\'#1890ff\'" onmouseout="this.style.color=\'#666\'" onclick="selectSummaryDimGroup(\'人员分类\')">人员分类</div>' +
      '</div>' +
    '</div>';

  document.body.appendChild(dd);

  setTimeout(function() {
    var handler = function(e) {
      if (!dd.contains(e.target) && e.target !== trigger) {
        dd.remove();
        document.removeEventListener('click', handler);
      }
    };
    document.addEventListener('click', handler);
  }, 0);
}

function selectSummaryDimGroup(name) {
  var dd = document.getElementById('summary-dim-group-dd');
  if (dd) dd.remove();
}

// ============ 汇总表 - 排序规则 ============
function addSummarySortRule() {
  alert('添加排序规则');
}

// ============ 汇总表 - 数据补录弹窗 ============
function openSummaryBackfillModal() {
  var overlay = document.createElement('div');
  overlay.id = 'summary-backfill-overlay';
  overlay.className = 'modal-overlay';

  var dayOpts = '';
  for (var i = 1; i <= 31; i++) dayOpts += '<option' + (i === 5 ? ' selected' : '') + '>' + i + '号</option>';
  var dayOpts2 = '';
  for (var j = 1; j <= 31; j++) dayOpts2 += '<option' + (j === 4 ? ' selected' : '') + '>' + j + '号</option>';

  var selSt = 'style="height:32px;font-size:13px;min-width:100px;border:1px solid #e5e6eb;border-radius:4px;padding:0 28px 0 10px;color:var(--text-primary);background:var(--bg-white) url(\'data:image/svg+xml;utf8,<svg xmlns=%22http://www.w3.org/2000/svg%22 width=%2210%22 height=%226%22><path d=%22M0 0l5 6 5-6z%22 fill=%22%2386909c%22/></svg>\') no-repeat right 10px center;appearance:none;-webkit-appearance:none;"';
  var inpSt = 'style="height:32px;font-size:13px;border:1px solid #e5e6eb;border-radius:4px;padding:0 10px;color:var(--text-primary);"';

  overlay.innerHTML = `
    <div class="modal" style="width:560px;max-height:none;overflow:visible;display:flex;flex-direction:column;">
      <div class="modal-header">
        <span class="modal-title">数据补录</span>
        <div class="modal-close" onclick="closeSummaryBackfillModal()"><i class="fa-solid fa-xmark"></i></div>
      </div>
      <div style="padding:24px 32px;">
        <div style="display:flex;align-items:center;gap:10px;margin-bottom:24px;">
          <span style="font-size:13px;color:#f53f3f;margin-right:-6px;">*</span>
          <span style="font-size:13px;color:var(--text-primary);white-space:nowrap;">时间范围：</span>
          <div style="flex:1;display:flex;align-items:center;border:2px solid var(--primary-color);border-radius:4px;padding:4px 10px;gap:8px;">
            <input type="text" value="2026-01" ${inpSt} style="border:none;flex:1;height:28px;font-size:13px;padding:0;outline:none;">
            <span style="color:#c9cdd4;">→</span>
            <input type="text" value="2026-06" ${inpSt} style="border:none;flex:1;height:28px;font-size:13px;padding:0;outline:none;">
          </div>
          <i class="fa-regular fa-calendar" style="font-size:14px;color:#86909c;cursor:pointer;margin-left:-4px;"></i>
        </div>

        <div style="display:flex;align-items:center;gap:10px;margin-bottom:20px;">
          <span style="font-size:13px;color:var(--text-primary);white-space:nowrap;min-width:72px;text-align:right;">执行机制：</span>
          <select class="form-select" ${selSt}><option selected>每月</option><option>每周</option><option>每日</option></select>
          <select class="form-select" ${selSt}>${dayOpts}</select>
          <div style="position:relative;display:flex;align-items:center;">
            <input type="text" value="15:11:00" ${inpSt} style="width:110px;padding-right:30px;">
            <i class="fa-regular fa-clock" style="position:absolute;right:8px;font-size:13px;color:#86909c;pointer-events:none;"></i>
          </div>
        </div>

        <div style="font-size:13px;font-weight:600;color:var(--text-primary);margin-bottom:16px;">数据时间范围：</div>
        <div style="display:flex;align-items:center;gap:10px;margin-bottom:14px;">
          <span style="font-size:13px;color:var(--text-primary);white-space:nowrap;min-width:72px;text-align:right;">开始时间：</span>
          <select class="form-select" ${selSt}><option selected>上一月</option><option>本月</option><option>上一周</option></select>
          <select class="form-select" ${selSt}>${dayOpts}</select>
          <div style="position:relative;display:flex;align-items:center;">
            <input type="text" value="00:00:00" ${inpSt} style="width:110px;padding-right:30px;">
            <i class="fa-regular fa-clock" style="position:absolute;right:8px;font-size:13px;color:#86909c;pointer-events:none;"></i>
          </div>
        </div>
        <div style="display:flex;align-items:center;gap:10px;">
          <span style="font-size:13px;color:var(--text-primary);white-space:nowrap;min-width:72px;text-align:right;">结束时间：</span>
          <select class="form-select" ${selSt}><option>上一月</option><option selected>本月</option><option>上一周</option></select>
          <select class="form-select" ${selSt}>${dayOpts2}</select>
          <div style="position:relative;display:flex;align-items:center;">
            <input type="text" value="00:00:00" ${inpSt} style="width:110px;padding-right:30px;">
            <i class="fa-regular fa-clock" style="position:absolute;right:8px;font-size:13px;color:#86909c;pointer-events:none;"></i>
          </div>
        </div>
      </div>
      <div style="display:flex;justify-content:flex-end;gap:12px;padding:16px 24px;border-top:1px solid #e5e6eb;">
        <button class="btn btn-default" onclick="closeSummaryBackfillModal()">取 消</button>
        <button class="btn btn-primary" onclick="closeSummaryBackfillModal()">确 定</button>
      </div>
    </div>`;

  document.body.appendChild(overlay);
}

function closeSummaryBackfillModal() {
  var el = document.getElementById('summary-backfill-overlay');
  if (el) el.remove();
}

// ============ 汇总表 - 查看日志弹窗 ============
function openSummaryLogModal() {
  var overlay = document.createElement('div');
  overlay.id = 'summary-log-overlay';
  overlay.className = 'modal-overlay';

  var ts = '2026-03-05';
  var logLines = [
    { time: ts + ' 16:41:13', cls: 'com.xxl.job.core.thread.JobThread#run', line: '133', thread: 'xxl-job, JobThread-60-1772700073532',
      text: '---------- xxl-job job execute start ----------<br>---------- Param: {&quot;cycle_type&quot;:4,&quot;summary_table_id&quot;:&quot;7f61ff9619788574753b3c6ee2fc9ebc&quot;}' },
    { time: ts + ' 16:41:13', cls: 'com.aotain.dataanalysis.service.job.SummaryJob#summaryTableHandler', line: '105', thread: 'xxl-job, JobThread-60-1772700073532',
      text: '========&gt;param: {&quot;cycle_type&quot;:4,&quot;summary_table_id&quot;:&quot;7f61ff9619788574753b3c6ee2fc9ebc&quot;}' },
    { time: ts + ' 16:41:13', cls: 'com.aotain.dataanalysis.service.job.SummaryJob#lambda$migrateList$0', line: '147', thread: 'xxl-job, JobThread-60-1772700073532',
      text: '开始自动补录汇总表【员工人数汇总】数据，id为【7f61ff9619788574753b3c6ee2fc9ebc】' },
    { time: ts + ' 16:41:13', cls: 'com.aotain.dataanalysis.service.job.SummaryJob#supplementTask', line: '317', thread: 'xxl-job, JobThread-60-1772700073532',
      text: '========任务【员工人数汇总】首次补数记录不为空，开始进行补数' },
    { time: ts + ' 16:41:13', cls: 'com.aotain.dataanalysis.service.job.SummaryJob#supplementTask', line: '320', thread: 'xxl-job, JobThread-60-1772700073532',
      text: '========任务【员工人数汇总】上个出发时间点为【2026-01-29T00:00】。' },
    { time: ts + ' 16:41:13', cls: 'com.aotain.dataanalysis.service.job.SummaryJob#supplementTask', line: '333', thread: 'xxl-job, JobThread-60-1772700073532',
      text: '========任务【员工人数汇总】开始自动补录数据，补录表ID：【7f61ff9619788574753b3c6ee2fc9ebc】，补录数据开始时间【' + ts + 'T15:11:44】，补录结束时间：【' + ts + 'T16:41:13.554】' },
    { time: ts + ' 16:41:14', cls: 'com.aotain.dataanalysis.service.job.SummaryJob#execute', line: '219', thread: 'xxl-job, JobThread-60-1772700073532',
      text: '汇总表【员工人数汇总】数据写入目标库，dbId【846】，dbName:【tms_dm】，tableName:【employees】' },
    { time: ts + ' 16:41:14', cls: 'com.aotain.dataanalysis.service.job.SummaryJob#execute', line: '244', thread: 'xxl-job, JobThread-60-1772700073532',
      text: '汇总表【员工人数汇总】结束执行，数据量:1，dbId【846】，dbName:【tms_dm】' },
  ];

  var logHtml = logLines.map(function(l) {
    return '<div style="margin-bottom:12px;line-height:1.7;word-break:break-all;">'
      + '<span style="color:var(--primary-color);">' + l.time + '</span> '
      + '<span style="color:#333;">[' + l.cls + ']</span>'
      + '-[<span style="color:var(--primary-color);">' + l.line + '</span>]'
      + '-[' + l.thread + ']'
      + '<br>' + l.text
      + '</div>';
  }).join('');

  overlay.innerHTML =
    '<div class="modal" style="width:720px;max-height:80vh;display:flex;flex-direction:column;">'
    + '<div class="modal-header">'
    + '<span class="modal-title">查看日志</span>'
    + '<div class="modal-close" onclick="closeSummaryLogModal()"><i class="fa-solid fa-xmark"></i></div>'
    + '</div>'
    + '<div style="flex:1;overflow-y:auto;padding:20px 24px;font-size:13px;font-family:Consolas,Monaco,\'Courier New\',monospace;background:#fafbfc;">'
    + logHtml
    + '</div>'
    + '<div style="display:flex;justify-content:flex-end;gap:12px;padding:16px 24px;border-top:1px solid #e5e6eb;">'
    + '<button class="btn btn-default" onclick="closeSummaryLogModal()">取 消</button>'
    + '<button class="btn btn-primary" onclick="closeSummaryLogModal()">确 定</button>'
    + '</div>'
    + '</div>';

  document.body.appendChild(overlay);
}

function closeSummaryLogModal() {
  var el = document.getElementById('summary-log-overlay');
  if (el) el.remove();
}

// ============ 汇总表 - 数据预览页面 ============
function openSummaryDataPreview(name) {
  var contentArea = document.getElementById('content-area');
  contentArea.innerHTML =
    '<div class="edit-page" style="display:flex;flex-direction:column;height:100%">' +
      '<div class="edit-page-header">' +
        '<span class="edit-page-title"><i class="fa-regular fa-clone" style="margin-right:6px;color:var(--text-tertiary)"></i>' + (name || '员工人数汇总') + '</span>' +
        '<div class="edit-page-actions">' +
          '<button class="btn btn-sm" onclick="loadPage(\'summary-table\')">返回</button>' +
        '</div>' +
      '</div>' +
      '<div class="edit-page-body" style="padding:16px 20px;flex:1;display:flex;flex-direction:column;overflow:hidden">' +
        '<div style="display:flex;align-items:center;gap:8px;margin-bottom:16px;flex-shrink:0">' +
          '<div style="display:flex;align-items:center;border:1px solid #d9d9d9;border-radius:4px;padding:0 10px;height:32px;width:160px;background:#fff;">' +
            '<i class="fa-solid fa-magnifying-glass" style="color:#bbb;font-size:12px;margin-right:6px;"></i>' +
            '<input type="text" placeholder="请输入" style="border:none;outline:none;font-size:13px;flex:1;background:transparent;">' +
          '</div>' +
          '<button class="btn btn-primary btn-sm">查 询</button>' +
          '<button class="btn btn-sm">重 置</button>' +
        '</div>' +
        '<div class="ind-table-wrap" style="flex:1;margin:0;display:flex;flex-direction:column">' +
          '<table class="data-table">' +
            '<thead>' +
              '<tr>' +
                '<th style="min-width:100px">时间列</th>' +
                '<th style="min-width:140px">日期</th>' +
                '<th style="min-width:140px">职工总人数</th>' +
                '<th style="min-width:140px">在岗职工人数</th>' +
                '<th style="min-width:140px">在岗职工占比</th>' +
              '</tr>' +
            '</thead>' +
            '<tbody>' +
              '<tr><td>2026-03</td><td>2026-03-01</td><td>1,286</td><td>1,142</td><td>88.80%</td></tr>' +
              '<tr><td>2026-02</td><td>2026-02-01</td><td>1,273</td><td>1,128</td><td>88.61%</td></tr>' +
              '<tr><td>2026-01</td><td>2026-01-01</td><td>1,265</td><td>1,119</td><td>88.46%</td></tr>' +
              '<tr><td>2025-12</td><td>2025-12-01</td><td>1,258</td><td>1,105</td><td>87.84%</td></tr>' +
              '<tr><td>2025-11</td><td>2025-11-01</td><td>1,251</td><td>1,098</td><td>87.77%</td></tr>' +
              '<tr><td>2025-10</td><td>2025-10-01</td><td>1,247</td><td>1,091</td><td>87.49%</td></tr>' +
              '<tr><td>2025-09</td><td>2025-09-01</td><td>1,239</td><td>1,083</td><td>87.41%</td></tr>' +
              '<tr><td>2025-08</td><td>2025-08-01</td><td>1,234</td><td>1,076</td><td>87.20%</td></tr>' +
              '<tr><td>2025-07</td><td>2025-07-01</td><td>1,228</td><td>1,069</td><td>87.05%</td></tr>' +
              '<tr><td>2025-06</td><td>2025-06-01</td><td>1,221</td><td>1,062</td><td>86.98%</td></tr>' +
            '</tbody>' +
          '</table>' +
          '<div class="pagination" style="padding:12px 16px;flex-shrink:0">' +
            '<span class="page-info">总共 36 条数据</span>' +
            '<span class="page-nav">' +
              '<span class="page-btn disabled"><i class="fa-solid fa-chevron-left"></i></span>' +
              '<span class="page-btn active">1</span>' +
              '<span class="page-btn">2</span>' +
              '<span class="page-btn">3</span>' +
              '<span class="page-btn">4</span>' +
              '<span class="page-btn"><i class="fa-solid fa-chevron-right"></i></span>' +
            '</span>' +
            '<span class="page-size">10 条/页</span>' +
          '</div>' +
        '</div>' +
      '</div>' +
    '</div>';
}

// ============ 汇总表 - 数据源下拉目录树 ============
function toggleSummaryDsTree(id) {
  var existingDd = document.getElementById('summary-ds-dd-' + id);
  if (existingDd) { existingDd.remove(); return; }

  document.querySelectorAll('[id^="summary-ds-dd-"]').forEach(function(el) { el.remove(); });

  var wrap = document.getElementById('summary-ds-tree-wrap-' + id);
  if (!wrap) return;

  var nt = function(indent, icon, iconColor, label, hasChildren, isOpen, isLeaf) {
    var pad = indent * 20;
    var arrow = hasChildren
      ? '<i class="fa-solid fa-caret-' + (isOpen ? 'down' : 'right') + '" style="font-size:10px;color:#999;width:12px;flex-shrink:0;"></i>'
      : '<span style="width:12px;flex-shrink:0;"></span>';
    var iconHtml = '<i class="fa-solid ' + icon + '" style="color:' + iconColor + ';font-size:13px;flex-shrink:0;"></i>';
    var clickAttr = isLeaf ? ' onclick="selectSummaryDsNode(\'' + id + '\',\'' + label.replace(/'/g, "\\'") + '\')"' : '';
    var hoverAttr = isLeaf ? ' onmouseover="this.style.background=\'#f0f5ff\'" onmouseout="this.style.background=\'transparent\'"' : '';
    return '<div style="padding:3px 8px 3px ' + (8 + pad) + 'px;display:flex;align-items:center;gap:5px;font-size:13px;color:#333;cursor:' + (isLeaf ? 'pointer' : 'default') + ';white-space:nowrap;"' + clickAttr + hoverAttr + '>' + arrow + iconHtml + '<span>' + label + '</span></div>';
  };

  var treeHtml =
    nt(0,'fa-folder','#999','我的企业/机构',true,true,false) +
      nt(1,'fa-folder','#999','公共',true,true,false) +
        nt(2,'fa-server','#4080ff','阳江_ClickHouse_测试环境',true,true,false) +
          nt(3,'fa-folder','#f5a623','default',true,true,false) +
            nt(4,'fa-database','#4080ff','default',false,false,true) +
            nt(4,'fa-database','#8c8c8c','system',false,false,true) +
            nt(4,'fa-database','#8c8c8c','information_schema',false,false,true) +
        nt(2,'fa-server','#4080ff','深圳_MySQL_生产环境',true,true,false) +
          nt(3,'fa-folder','#f5a623','crdata',true,true,false) +
            nt(4,'fa-database','#4080ff','hr_db',false,false,true) +
            nt(4,'fa-database','#8c8c8c','finance_db',false,false,true) +
            nt(4,'fa-database','#8c8c8c','sales_db',false,false,true) +
            nt(4,'fa-database','#8c8c8c','logistics_db',false,false,true) +
          nt(3,'fa-folder','#f5a623','analysis',true,false,false) +
        nt(2,'fa-server','#8c8c8c','华润_Oracle_核心库',true,false,false) +
      nt(1,'fa-folder','#999','私有',true,true,false) +
        nt(2,'fa-server','#4080ff','本地_PostgreSQL_开发环境',true,true,false) +
          nt(3,'fa-folder','#f5a623','public',true,true,false) +
            nt(4,'fa-database','#4080ff','indicator_dev',false,false,true) +
            nt(4,'fa-database','#8c8c8c','dim_dev',false,false,true) +
            nt(4,'fa-database','#8c8c8c','fact_dev',false,false,true) +
            nt(4,'fa-database','#8c8c8c','staging_dev',false,false,true) +
        nt(2,'fa-server','#8c8c8c','测试_Doris_数据湖',true,false,false);

  var dd = document.createElement('div');
  dd.id = 'summary-ds-dd-' + id;
  dd.style.cssText = 'position:absolute;top:100%;left:0;min-width:100%;width:max-content;z-index:300;background:#fff;border:1px solid #d9d9d9;border-radius:4px;box-shadow:0 4px 12px rgba(0,0,0,.12);margin-top:2px;max-height:320px;overflow-y:auto;overflow-x:hidden;padding:6px 0;';
  dd.innerHTML = treeHtml;
  wrap.appendChild(dd);

  setTimeout(function() {
    var handler = function(e) {
      if (!dd.contains(e.target) && !wrap.contains(e.target)) {
        dd.remove();
        document.removeEventListener('click', handler);
      }
    };
    document.addEventListener('click', handler);
  }, 0);
}

function selectSummaryDsNode(id, name) {
  var inp = document.getElementById('summary-ds-input-' + id);
  if (inp) inp.value = name;
  var dd = document.getElementById('summary-ds-dd-' + id);
  if (dd) dd.remove();
}

// ============ 汇总表 - 立即执行弹窗 ============
function openSummaryExecuteModal() {
  var overlay = document.createElement('div');
  overlay.id = 'summary-execute-overlay';
  overlay.className = 'modal-overlay';

  var modal = document.createElement('div');
  modal.className = 'modal';
  modal.style.cssText = 'width:520px;display:flex;flex-direction:column;overflow:hidden;';
  modal.innerHTML =
    '<div class="modal-header">' +
      '<span class="modal-title">提示</span>' +
      '<span class="modal-close" onclick="closeSummaryExecuteModal()">&times;</span>' +
    '</div>' +
    '<div style="padding:24px 28px;">' +
      '<div style="font-size:14px;font-weight:600;color:#333;margin-bottom:16px;">数据时间范围：</div>' +
      '<div style="display:flex;align-items:center;gap:10px;margin-bottom:14px;">' +
        '<span style="font-size:13px;color:#333;width:60px;text-align:right;">开始时间:</span>' +
        '<select class="form-control form-select" style="width:120px;"><option selected>昨天</option><option>今天</option><option>前天</option><option>上周</option><option>上月</option></select>' +
        '<div style="display:flex;align-items:center;border:1px solid #d9d9d9;border-radius:4px;padding:0 8px;height:32px;width:130px;">' +
          '<input type="text" value="00:00:00" style="flex:1;border:none;outline:none;font-size:13px;color:#333;background:transparent;">' +
          '<i class="fa-regular fa-clock" style="color:#c9cdd4;font-size:13px;"></i>' +
        '</div>' +
      '</div>' +
      '<div style="display:flex;align-items:center;gap:10px;">' +
        '<span style="font-size:13px;color:#333;width:60px;text-align:right;">结束时间:</span>' +
        '<select class="form-control form-select" style="width:120px;"><option>昨天</option><option selected>当天</option><option>今天</option><option>明天</option></select>' +
        '<div style="display:flex;align-items:center;border:1px solid #d9d9d9;border-radius:4px;padding:0 8px;height:32px;width:130px;">' +
          '<input type="text" value="00:00:00" style="flex:1;border:none;outline:none;font-size:13px;color:#333;background:transparent;">' +
          '<i class="fa-regular fa-clock" style="color:#c9cdd4;font-size:13px;"></i>' +
        '</div>' +
      '</div>' +
    '</div>' +
    '<div style="display:flex;justify-content:flex-end;gap:8px;padding:14px 28px;border-top:1px solid #f0f0f0;">' +
      '<button class="btn btn-sm" onclick="closeSummaryExecuteModal()">取 消</button>' +
      '<button class="btn btn-primary btn-sm" onclick="closeSummaryExecuteModal()">确 定</button>' +
    '</div>';

  overlay.appendChild(modal);
  document.body.appendChild(overlay);
}

function closeSummaryExecuteModal() {
  var el = document.getElementById('summary-execute-overlay');
  if (el) el.remove();
}
