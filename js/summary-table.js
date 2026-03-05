// 汇总表模块
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
