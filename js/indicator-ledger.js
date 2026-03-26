// 指标台账模块

var _ledgerColumns = [
  { group:'分类属性', key:'catCode1', label:'一级数据分类编码', note:'一级数据分类编码依据数据资产管理平台已有的一级数据分类编码进行填写；如为新增数据分类，需按数据分类名称拼音首字母大写填写，不允许使用下划线"_"以外的特殊符号；如非新增分类，应保持与原分类编码一致。' },
  { group:'分类属性', key:'catName1', label:'一级数据分类名称', note:'一级数据分类依据《集团数据架构管理办法》的【附件七-一级数据资产目录】进行分类，若需新增或变更现有一级数据分类，由关键用户组织相关领域业务代表讨论形成方案，并提交运营中心组织审核并推动发布。' },
  { group:'分类属性', key:'catCode2', label:'二级数据分类编码', note:'二级数据分类编码依据数据资产管理平台已有的一级数据分类编码进行填写；如为新增数据分类，需按数据分类名称拼音首字母大写填写，不允许使用下划线"_"以外的特殊符号；如非新增分类，应保持与原分类编码一致。' },
  { group:'分类属性', key:'catName2', label:'二级数据分类名称', note:'二级数据分类依据《集团数据架构管理办法》的【附件七-二级数据资产目录】进行分类，若需新增或变更现有二级数据分类，由关键用户组织相关领域业务代表讨论形成方案，并提交运营中心组织审核并推动发布。' },
  { group:'分类属性', key:'catCode3', label:'三级数据分类编码', note:'三级数据分类编码依据数据资产管理平台已有的三级数据分类编码进行填写；如为新增数据分类，需按数据分类名称拼音首字母大写填写，不允许使用下划线"_"以外的特殊符号；如非新增分类，应保持与原分类编码一致。' },
  { group:'分类属性', key:'catName3', label:'三级数据分类名称', note:'三级数据分类基于集团部门或成员公司已有的三级数据分类进行分类，已有的数据分类可通过数据资产管理平台进行查询；若需新增或变更现有三级数据分类，由关键用户组织相关领域业务代表讨论形成方案，并提交运营中心组织审核并推动发布。' },
  { group:'业务属性', key:'code', label:'指标编码', note:'根据指标编码规则进行编码' },
  { group:'业务属性', key:'name', label:'指标名称', note:'描述指标的业务名称（必填）' },
  { group:'业务属性', key:'definition', label:'指标定义', note:'明确给出指标的业务定义，确保对指标理解的一致性（必填）' },
  { group:'业务属性', key:'caliber', label:'指标口径', note:'描述指标的业务统计口径，有两类口径：（1）统计范围口径，指包含什么，不包含什么。（2）统计方式口径，指统计采用的依据或方式。' },
  { group:'业务属性', key:'formula', label:'计算公式', note:'指标的计算公式，如A=B/C。对于衍生指标（由基础指标通过计算得到的指标），计算公式是必填的。基础指标可以不填。' },
  { group:'业务属性', key:'type', label:'指标类别', note:'基础指标或者衍生指标（基础指标指表达业务实体原子量化属性的且不可再分的概念集合），下拉选择（必填）' },
  { group:'业务属性', key:'unit', label:'计量单位', note:'指标的计量单位，如万元（必填）' },
  { group:'技术属性', key:'physTableCn', label:'物理表中文名称', note:'该数据所在系统的物理表中文名称（表注释）（有对应业务系统必填）' },
  { group:'技术属性', key:'physTableEn', label:'物理表英文名称', note:'该数据所在系统的物理表英文名称（有对应业务系统必填）' },
  { group:'技术属性', key:'physFieldCn', label:'物理字段中文名称', note:'该数据对应系统的物理字段中文名称（字段注释）（有对应业务系统必填）' },
  { group:'技术属性', key:'physFieldEn', label:'物理字段英文名称', note:'该数据所在系统的物理字段英文名称（有对应业务系统必填）' },
  { group:'管理属性', key:'dimension', label:'指标分析维度', note:'该指标的分析维度（可从多方面分析）（必填）' },
  { group:'管理属性', key:'defDept', label:'指标定义部门', note:'填写对指标名称、含义、口径、计算方式等进行定义的业务部门（必填）' },
  { group:'管理属性', key:'mgmtDept', label:'指标管理部门', note:'列举此指标资产管理部门（必填）' },
  { group:'管理属性', key:'importance', label:'数据重要程度', note:'数据的重要程度，分为一般、重要、核心（必选）' },
  { group:'管理属性', key:'isValid', label:'是否有效', note:'判断该指标资产是否进行从业务视角数据资产管理（必选）' },
  { group:'管理属性', key:'author', label:'填写人', note:'该表格的填写人工号及姓名' }
];

var _ledgerData = [
  { catCode1:'HIM', catName1:'人员信息管理', catCode2:'HIM-DPM', catName2:'日常人事管理', catCode3:'HIM-DPM-08', catName3:'员工信息管理', code:'RZL-001', name:'本月入职比例', definition:'本月入职承包商人员占总承包商人员比例', caliber:'按月统计', formula:'本月入职承包商人员/总承包商人员', type:'衍生指标', unit:'%', physTableCn:'本月入职比例表', physTableEn:'ods_RZL', physFieldCn:'本月入职比例', physFieldEn:'RZL', dimension:'时间、人员类型', defDept:'人力资源部人事处', mgmtDept:'人力资源部人事处', importance:'一般', isValid:'有效', author:'P650100 张三' },
  { catCode1:'HIM', catName1:'人员信息管理', catCode2:'HIM-DPM', catName2:'日常人事管理', catCode3:'HIM-DPM-08', catName3:'员工信息管理', code:'RZL-002', name:'在岗职工人数', definition:'统计企业在岗职工总人数', caliber:'按月统计在岗人数', formula:'—', type:'原子指标', unit:'人', physTableCn:'员工信息宽表', physTableEn:'ads_ehr_staff_wide', physFieldCn:'在岗人数', physFieldEn:'on_duty_count', dimension:'时间、组织', defDept:'人力资源部人事处', mgmtDept:'人力资源部人事处', importance:'重要', isValid:'有效', author:'P650101 李四' },
  { catCode1:'HIM', catName1:'人员信息管理', catCode2:'HIM-DPM', catName2:'日常人事管理', catCode3:'HIM-DPM-09', catName3:'考勤管理', code:'RZL-003', name:'月度出勤率', definition:'当月实际出勤天数占应出勤天数的百分比', caliber:'按月统计', formula:'实际出勤天数/应出勤天数×100%', type:'衍生指标', unit:'%', physTableCn:'考勤统计表', physTableEn:'ods_attendance', physFieldCn:'出勤率', physFieldEn:'attendance_rate', dimension:'时间、部门', defDept:'人力资源部', mgmtDept:'人力资源部', importance:'一般', isValid:'有效', author:'P650102 王五' },
  { catCode1:'FIN', catName1:'财务管理', catCode2:'FIN-REV', catName2:'收入管理', catCode3:'FIN-REV-01', catName3:'营业收入', code:'CW-001', name:'月度营业收入', definition:'企业当月确认的营业收入总额', caliber:'按权责发生制确认', formula:'—', type:'原子指标', unit:'万元', physTableCn:'收入明细表', physTableEn:'ads_fin_revenue', physFieldCn:'营业收入', physFieldEn:'revenue_amount', dimension:'时间、业务板块', defDept:'财务管理部', mgmtDept:'财务管理部', importance:'核心', isValid:'有效', author:'P650103 赵六' },
  { catCode1:'FIN', catName1:'财务管理', catCode2:'FIN-REV', catName2:'收入管理', catCode3:'FIN-REV-02', catName3:'利润分析', code:'CW-002', name:'营业利润率', definition:'营业利润占营业收入的百分比', caliber:'按月度计算', formula:'营业利润/营业收入×100%', type:'衍生指标', unit:'%', physTableCn:'利润分析表', physTableEn:'ads_fin_profit', physFieldCn:'利润率', physFieldEn:'profit_rate', dimension:'时间、业务板块', defDept:'财务管理部', mgmtDept:'财务管理部', importance:'核心', isValid:'有效', author:'P650103 赵六' },
  { catCode1:'FIN', catName1:'财务管理', catCode2:'FIN-COST', catName2:'成本管理', catCode3:'FIN-COST-01', catName3:'生产成本', code:'CW-003', name:'单位生产成本', definition:'单位产品的生产成本', caliber:'按月度归集', formula:'生产总成本/产品数量', type:'衍生指标', unit:'元', physTableCn:'成本归集表', physTableEn:'ads_fin_cost', physFieldCn:'单位成本', physFieldEn:'unit_cost', dimension:'时间、产品', defDept:'财务管理部', mgmtDept:'财务管理部', importance:'重要', isValid:'有效', author:'P650104 孙七' },
  { catCode1:'PRD', catName1:'生产管理', catCode2:'PRD-ORD', catName2:'订单管理', catCode3:'PRD-ORD-01', catName3:'生产订单', code:'SC-001', name:'生产订单完成率', definition:'已完成生产订单数占计划订单数的百分比', caliber:'按日统计', formula:'完成订单数/计划订单数×100%', type:'衍生指标', unit:'%', physTableCn:'生产订单表', physTableEn:'ods_prod_order', physFieldCn:'完成率', physFieldEn:'completion_rate', dimension:'时间、产线', defDept:'生产运营部', mgmtDept:'生产运营部', importance:'重要', isValid:'有效', author:'P650105 周八' },
  { catCode1:'PRD', catName1:'生产管理', catCode2:'PRD-ORD', catName2:'订单管理', catCode3:'PRD-ORD-01', catName3:'生产订单', code:'SC-002', name:'日完成生产订单数', definition:'每日完成的生产订单数量', caliber:'按日统计', formula:'—', type:'原子指标', unit:'个', physTableCn:'生产订单表', physTableEn:'ods_prod_order', physFieldCn:'完成订单数', physFieldEn:'done_order_cnt', dimension:'时间、产线', defDept:'生产运营部', mgmtDept:'生产运营部', importance:'一般', isValid:'有效', author:'P650105 周八' },
  { catCode1:'PRD', catName1:'生产管理', catCode2:'PRD-QTY', catName2:'质量管理', catCode3:'PRD-QTY-01', catName3:'质量检测', code:'SC-003', name:'产品合格率', definition:'合格产品数占检测产品总数的百分比', caliber:'按批次统计', formula:'合格产品数/检测产品总数×100%', type:'衍生指标', unit:'%', physTableCn:'质检记录表', physTableEn:'ods_quality_check', physFieldCn:'合格率', physFieldEn:'pass_rate', dimension:'时间、产品', defDept:'质量管理部', mgmtDept:'质量管理部', importance:'核心', isValid:'有效', author:'P650106 吴九' },
  { catCode1:'SAL', catName1:'销售管理', catCode2:'SAL-CUS', catName2:'客户管理', catCode3:'SAL-CUS-01', catName3:'客户分析', code:'XS-001', name:'客户留存率', definition:'期末客户数占期初客户数的百分比', caliber:'按季度统计', formula:'期末客户数/期初客户数×100%', type:'衍生指标', unit:'%', physTableCn:'客户信息表', physTableEn:'ads_sal_customer', physFieldCn:'留存率', physFieldEn:'retention_rate', dimension:'时间、区域', defDept:'市场营销部', mgmtDept:'市场营销部', importance:'重要', isValid:'有效', author:'P650107 郑十' },
];

function _buildLedgerGroupHeaders() {
  var groups = [];
  var lastGroup = '';
  var span = 0;
  for (var i = 0; i < _ledgerColumns.length; i++) {
    var g = _ledgerColumns[i].group;
    if (g === lastGroup) {
      span++;
      groups[groups.length - 1].span = span;
    } else {
      lastGroup = g;
      span = 1;
      groups.push({ label: g, span: 1 });
    }
  }
  var html = '<tr class="ledger-group-row">';
  for (var j = 0; j < groups.length; j++) {
    var colors = { '分类属性':'#e8f5e9', '业务属性':'#e3f2fd', '技术属性':'#fff3e0', '管理属性':'#f3e5f5' };
    var borderColors = { '分类属性':'#66bb6a', '业务属性':'#42a5f5', '技术属性':'#ffa726', '管理属性':'#ab47bc' };
    var bg = colors[groups[j].label] || '#f5f5f5';
    var bc = borderColors[groups[j].label] || '#ccc';
    html += '<th colspan="' + groups[j].span + '" style="background:' + bg + ';border-bottom:2px solid ' + bc + ';text-align:center;font-weight:600;font-size:13px;color:#333;padding:8px 6px;white-space:nowrap;">' + groups[j].label + '</th>';
  }
  html += '<th rowspan="2" style="background:#f0f0f0;text-align:center;font-weight:600;font-size:13px;padding:8px 6px;min-width:60px;">操作</th>';
  html += '</tr>';
  return html;
}

function _buildLedgerColumnHeaders() {
  var html = '<tr class="ledger-col-row">';
  for (var i = 0; i < _ledgerColumns.length; i++) {
    var col = _ledgerColumns[i];
    var noteIcon = '';
    if (col.note) {
      var escapedNote = col.note.replace(/'/g, "\\'").replace(/"/g, '&quot;');
      noteIcon = ' <i class="fa-regular fa-circle-question ledger-note-icon" data-note="' + escapedNote + '" onmouseenter="showLedgerNote(this)" onmouseleave="hideLedgerNote()"></i>';
    }
    html += '<th style="white-space:nowrap;font-size:12px;font-weight:500;padding:8px 8px;background:#fafafa;min-width:100px;">' + col.label + noteIcon + '</th>';
  }
  html += '</tr>';
  return html;
}

function _buildLedgerRows() {
  var html = '';
  for (var i = 0; i < _ledgerData.length; i++) {
    var d = _ledgerData[i];
    html += '<tr>';
    for (var j = 0; j < _ledgerColumns.length; j++) {
      var key = _ledgerColumns[j].key;
      var val = d[key] || '—';
      var maxW = 'max-width:180px;';
      if (key === 'definition' || key === 'caliber' || key === 'formula' || key === 'note') maxW = 'max-width:220px;';
      if (key === 'type') {
        var cls = val === '原子指标' ? 'badge-blue' : val === '衍生指标' ? 'badge-orange' : 'badge-green';
        val = '<span class="badge ' + cls + '">' + val + '</span>';
      }
      if (key === 'importance') {
        var ic = val === '核心' ? 'badge-red' : val === '重要' ? 'badge-orange' : 'badge-gray';
        val = '<span class="badge ' + ic + '">' + val + '</span>';
      }
      if (key === 'isValid') {
        val = val === '有效' ? '<span class="badge badge-green">有效</span>' : '<span class="badge badge-gray">无效</span>';
      }
      html += '<td style="font-size:12px;padding:8px 8px;white-space:nowrap;overflow:hidden;text-overflow:ellipsis;' + maxW + '" title="' + (d[_ledgerColumns[j].key] || '') + '">' + val + '</td>';
    }
    html += '<td style="text-align:center;background:#fff;padding:8px 8px;"><a class="action-link" onclick="openIndicatorDetail(\'' + d.name + '\',\'' + d.code + '\',\'' + d.type + '\',\'' + d.catName1 + '/' + d.catName2 + '/' + d.catName3 + '\',\'indicator-ledger\')">详情</a></td>';
    html += '</tr>';
  }
  return html;
}

function showLedgerNote(el) {
  hideLedgerNote();
  var note = el.getAttribute('data-note');
  if (!note) return;
  var rect = el.getBoundingClientRect();
  var tip = document.createElement('div');
  tip.id = 'ledger-note-tip';
  tip.style.cssText = 'position:fixed;z-index:9999;background:#333;color:#fff;padding:10px 14px;border-radius:6px;font-size:12px;line-height:1.6;max-width:360px;word-break:break-all;box-shadow:0 4px 16px rgba(0,0,0,.2);pointer-events:none;';
  tip.style.left = Math.min(rect.left, window.innerWidth - 380) + 'px';
  tip.style.top = (rect.bottom + 6) + 'px';
  tip.textContent = note;
  document.body.appendChild(tip);
}

function hideLedgerNote() {
  var old = document.getElementById('ledger-note-tip');
  if (old) old.remove();
}

function renderIndicatorLedger(container) {
  container.innerHTML =
    '<div class="split-layout">' +
      '<div class="split-left">' +
        '<div class="split-left-header">' +
          '<i class="fa-solid fa-list"></i>' +
          '<span>指标分类</span>' +
        '</div>' +
        '<div class="split-left-search">' +
          '<div class="search-box" style="width:100%">' +
            '<i class="fa-solid fa-magnifying-glass"></i>' +
            '<input type="text" placeholder="搜索" style="width:100%">' +
          '</div>' +
        '</div>' +
        '<div class="category-tree" id="ledger-tree"></div>' +
      '</div>' +
      '<div class="split-right">' +
        '<div class="ind-filter-row" style="flex-wrap:wrap;gap:8px 12px;border:none;padding:8px 16px;align-items:center;">' +
          '<label class="filter-label">指标编码</label>' +
          '<div class="search-box search-sm"><i class="fa-solid fa-magnifying-glass"></i><input type="text" placeholder="请输入指标编码"></div>' +
          '<label class="filter-label">指标名称</label>' +
          '<div class="search-box search-sm"><i class="fa-solid fa-magnifying-glass"></i><input type="text" placeholder="请输入指标名称"></div>' +
          '<label class="filter-label">指标类别</label>' +
          '<div class="select-box select-sm ledger-dropdown" onclick="toggleLedgerDropdown(this)" style="position:relative;cursor:pointer;user-select:none;">' +
            '<span class="ledger-dd-text">全部</span> <i class="fa-solid fa-chevron-down"></i>' +
            '<div class="ledger-dd-panel" style="display:none;position:absolute;top:100%;left:0;right:0;z-index:200;background:#fff;border:1px solid #d9d9d9;border-radius:4px;box-shadow:0 4px 12px rgba(0,0,0,.12);margin-top:2px;padding:4px 0;min-width:140px;">' +
              '<div class="ledger-dd-item selected" onclick="selectLedgerDropdown(this,event)">全部</div>' +
              '<div class="ledger-dd-item" onclick="selectLedgerDropdown(this,event)">原子指标</div>' +
              '<div class="ledger-dd-item" onclick="selectLedgerDropdown(this,event)">派生指标</div>' +
              '<div class="ledger-dd-item" onclick="selectLedgerDropdown(this,event)">衍生指标</div>' +
            '</div>' +
          '</div>' +
          '<label class="filter-label">物理表中文名称</label>' +
          '<div class="search-box search-sm"><i class="fa-solid fa-magnifying-glass"></i><input type="text" placeholder="请输入物理表中文名称"></div>' +
          '<label class="filter-label">物理表英文名称</label>' +
          '<div class="search-box search-sm"><i class="fa-solid fa-magnifying-glass"></i><input type="text" placeholder="请输入物理表英文名称"></div>' +
          '<label class="filter-label">物理字段中文名称</label>' +
          '<div class="search-box search-sm"><i class="fa-solid fa-magnifying-glass"></i><input type="text" placeholder="请输入物理字段中文名称"></div>' +
          '<label class="filter-label">物理字段英文名称</label>' +
          '<div class="search-box search-sm"><i class="fa-solid fa-magnifying-glass"></i><input type="text" placeholder="请输入物理字段英文名称"></div>' +
          '<label class="filter-label">是否有效</label>' +
          '<div class="select-box select-sm ledger-dropdown" onclick="toggleLedgerDropdown(this)" style="position:relative;cursor:pointer;user-select:none;">' +
            '<span class="ledger-dd-text">全部</span> <i class="fa-solid fa-chevron-down"></i>' +
            '<div class="ledger-dd-panel" style="display:none;position:absolute;top:100%;left:0;right:0;z-index:200;background:#fff;border:1px solid #d9d9d9;border-radius:4px;box-shadow:0 4px 12px rgba(0,0,0,.12);margin-top:2px;padding:4px 0;min-width:120px;">' +
              '<div class="ledger-dd-item selected" onclick="selectLedgerDropdown(this,event)">全部</div>' +
              '<div class="ledger-dd-item" onclick="selectLedgerDropdown(this,event)">是</div>' +
              '<div class="ledger-dd-item" onclick="selectLedgerDropdown(this,event)">否</div>' +
            '</div>' +
          '</div>' +
          '<button class="btn btn-primary btn-sm">查询</button>' +
          '<button class="btn btn-sm">重置</button>' +
          '<button class="btn btn-sm"><i class="fa-solid fa-download"></i> 导出</button>' +
        '</div>' +
        '<div class="ledger-wrap">' +
          '<table class="data-table ledger-table">' +
            '<thead>' +
              _buildLedgerGroupHeaders() +
              _buildLedgerColumnHeaders() +
            '</thead>' +
            '<tbody>' +
              _buildLedgerRows() +
            '</tbody>' +
          '</table>' +
        '</div>' +
        '<div class="pagination" style="flex-shrink:0;">' +
          '<span class="page-info">总共 ' + _ledgerData.length + ' 条数据</span>' +
          '<div class="page-btn"><i class="fa-solid fa-chevron-left"></i></div>' +
          '<div class="page-btn active">1</div>' +
          '<div class="page-btn"><i class="fa-solid fa-chevron-right"></i></div>' +
          '<span class="page-info" style="margin-left:8px">20 条/页</span>' +
        '</div>' +
      '</div>' +
    '</div>';

  _renderLedgerTree();
  document.addEventListener('click', _closeLedgerDropdowns);
}

function toggleLedgerDropdown(el) {
  var panel = el.querySelector('.ledger-dd-panel');
  if (!panel) return;
  var isOpen = panel.style.display !== 'none';
  _closeAllLedgerDropdowns();
  if (!isOpen) {
    panel.style.display = 'block';
    el.style.borderColor = '#3370ff';
  }
}

function selectLedgerDropdown(item, e) {
  e.stopPropagation();
  var dd = item.closest('.ledger-dropdown');
  var textEl = dd.querySelector('.ledger-dd-text');
  var items = dd.querySelectorAll('.ledger-dd-item');
  items.forEach(function(it) { it.classList.remove('selected'); });
  item.classList.add('selected');
  textEl.textContent = item.textContent;
  dd.querySelector('.ledger-dd-panel').style.display = 'none';
  dd.style.borderColor = '';
}

function _closeAllLedgerDropdowns() {
  document.querySelectorAll('.ledger-dropdown').forEach(function(dd) {
    var panel = dd.querySelector('.ledger-dd-panel');
    if (panel) panel.style.display = 'none';
    dd.style.borderColor = '';
  });
}

function _closeLedgerDropdowns(e) {
  if (!e.target.closest('.ledger-dropdown')) {
    _closeAllLedgerDropdowns();
  }
}

// ============ 目录树 ============
var _ledgerTreeData = [
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

function _renderLedgerTree() {
  var container = document.getElementById('ledger-tree');
  if (!container) return;
  container.innerHTML = _buildTreeNodes(_ledgerTreeData, 0);
  var first = container.querySelector('.ltree-label');
  if (first) first.classList.add('active');
}

function _buildTreeNodes(nodes, depth) {
  var html = '';
  for (var i = 0; i < nodes.length; i++) {
    var n = nodes[i];
    var hasChildren = n.children && n.children.length > 0;
    var isOpen = n.open !== false && hasChildren;
    var pad = depth === 0 ? 8 : (depth * 18 + 8);

    html += '<div class="ltree-item">';
    html += '<div class="ltree-label" style="padding-left:' + pad + 'px;" onclick="selectLedgerTreeNode(this)">';
    if (hasChildren) {
      html += '<i class="fa-solid ' + (isOpen ? 'fa-chevron-down' : 'fa-chevron-right') + ' ltree-arrow" onclick="event.stopPropagation();toggleLedgerTree(this)"></i>';
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
      html += _buildTreeNodes(n.children, depth + 1);
      html += '</div>';
    }
    html += '</div>';
  }
  return html;
}

function toggleLedgerTree(arrowEl) {
  var label = arrowEl.closest('.ltree-label');
  var children = label.nextElementSibling;
  if (!children) return;
  var isOpen = children.style.display !== 'none';
  if (isOpen) {
    children.style.display = 'none';
    arrowEl.classList.remove('fa-chevron-down');
    arrowEl.classList.add('fa-chevron-right');
    var folderIcon = label.querySelector('.cat-icon');
    if (folderIcon) { folderIcon.classList.remove('fa-folder-open'); folderIcon.classList.add('fa-folder'); }
  } else {
    children.style.display = '';
    arrowEl.classList.remove('fa-chevron-right');
    arrowEl.classList.add('fa-chevron-down');
    var folderIcon = label.querySelector('.cat-icon');
    if (folderIcon) { folderIcon.classList.remove('fa-folder'); folderIcon.classList.add('fa-folder-open'); }
  }
}

function selectLedgerTreeNode(labelEl) {
  document.querySelectorAll('#ledger-tree .ltree-label').forEach(function(l) { l.classList.remove('active'); });
  labelEl.classList.add('active');
}
