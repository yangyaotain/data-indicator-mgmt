// 时间周期模块
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
                <i class="fa-regular fa-trash-can action-icon action-icon-danger" title="删除" onclick="confirmDelete('新增周期')"></i>
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
      <i class="fa-regular fa-trash-can action-icon action-icon-danger" title="删除" onclick="confirmDelete('新增周期')"></i>
    </td>`;
  tbody.appendChild(tr);
}
