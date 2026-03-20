// 指标审核模块
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
          <div class="fact-edit-tab active" onclick="switchAuditTab(this,'pending')">待处理</div>
          <div class="fact-edit-tab" onclick="switchAuditTab(this,'processed')">已处理</div>
          <div class="fact-edit-tab" onclick="switchAuditTab(this,'initiated')">已发起</div>
        </div>
        <div id="audit-tab-content"></div>
      </div>
    </div>`;
  renderAuditPendingTab();
}

function openAuditDetailPage(name, code, category) {
  var contentArea = document.getElementById('content-area');
  name = name || '销售订单总数';
  code = code || 'product1';
  category = category || '销售线';

  var auditRecords = [
    { time:'2025-03-17 15:29:09', user:'test', status:'上线申请', desc:'申请理由xxx' },
    { time:'2025-03-13 15:29:09', user:'admin', status:'上线审核驳回', desc:'审核说明xxx' },
    { time:'2025-03-13 15:29:09', user:'test', status:'上线申请', desc:'申请理由xxx修改' },
    { time:'2025-03-13 15:29:09', user:'xx节点', status:'上线待审核', desc:'—' },
    { time:'2025-03-13 15:29:09', user:'—', status:'上线审核通过', desc:'审核流程关闭，系统自动审核通过；' },
  ];

  var recordRows = auditRecords.map(function(r) {
    return '<tr><td>'+r.time+'</td><td>'+r.user+'</td><td>'+r.status+'</td><td>'+r.desc+'</td></tr>';
  }).join('');

  var labelStyle = 'display:inline-block;width:80px;text-align:right;font-size:13px;color:#666;flex-shrink:0;';
  var inputStyle = 'flex:1;height:32px;border:1px solid #d9d9d9;border-radius:3px;padding:0 8px;font-size:13px;outline:none;box-sizing:border-box;background:#fff;color:#333;';

  contentArea.innerHTML =
    '<div class="edit-page">' +
      '<div class="edit-page-header">' +
        '<span class="edit-page-title">XX指标审核</span>' +
        '<div class="edit-page-actions">' +
          '<button class="btn btn-primary btn-sm" onclick="loadPage(\'indicator-audit\')">保 存</button>' +
          '<button class="btn btn-sm" onclick="loadPage(\'indicator-audit\')">返 回</button>' +
        '</div>' +
      '</div>' +
      '<div class="edit-page-body" style="padding:0;flex:1;overflow:hidden;display:flex;flex-direction:column;">' +
        '<div style="display:flex;gap:0;align-items:stretch;flex:1;overflow:hidden;">' +

          '<div style="flex:1;min-width:0;overflow-y:auto;padding:20px 24px;border-right:1px solid #f0f0f0;">' +
            '<div style="font-size:14px;font-weight:600;color:#333;margin-bottom:16px;">审核说明</div>' +

            '<div style="display:flex;align-items:flex-start;margin-bottom:14px;">' +
              '<span style="'+labelStyle+'padding-top:6px;">处理意见：</span>' +
              '<textarea rows="3" style="flex:1;border:1px solid #d9d9d9;border-radius:3px;padding:8px;font-size:13px;outline:none;box-sizing:border-box;resize:vertical;color:#333;">XXX</textarea>' +
            '</div>' +

            '<div style="display:flex;align-items:center;margin-bottom:14px;">' +
              '<span style="'+labelStyle+'"><span style="color:#f53f3f;">*</span>审核意见：</span>' +
              '<select style="'+inputStyle+'appearance:auto;">' +
                '<option selected>通过</option><option>驳回</option>' +
              '</select>' +
            '</div>' +

            '<div style="display:flex;align-items:flex-start;margin-bottom:14px;">' +
              '<span style="'+labelStyle+'padding-top:6px;">审核说明：</span>' +
              '<textarea rows="4" placeholder="500字符以内" maxlength="500" style="flex:1;border:1px solid #d9d9d9;border-radius:3px;padding:8px;font-size:13px;outline:none;box-sizing:border-box;resize:vertical;color:#999;"></textarea>' +
            '</div>' +

            '<div style="font-size:14px;font-weight:600;color:#333;margin:24px 0 12px;">审核记录</div>' +
            '<table class="data-table" style="font-size:12px;">' +
              '<thead><tr><th>时间</th><th>操作者</th><th>审核状态</th><th>申请/审核说明</th></tr></thead>' +
              '<tbody>' + recordRows + '</tbody>' +
            '</table>' +
          '</div>' +

          '<div style="flex:1;min-width:0;overflow-y:auto;padding:20px 24px;">' +
            '<div style="font-size:14px;font-weight:600;color:#333;margin-bottom:16px;">指标信息（基本信息）</div>' +
            _buildIndicatorBasicInfo(name, code, null, category) +
          '</div>' +

        '</div>' +
      '</div>' +
    '</div>';
}

function openBatchAuditModal() {
  var existing = document.getElementById('batch-audit-overlay');
  if (existing) existing.remove();

  var overlay = document.createElement('div');
  overlay.id = 'batch-audit-overlay';
  overlay.style.cssText = 'position:fixed;top:0;left:0;right:0;bottom:0;background:rgba(0,0,0,.45);z-index:9000;display:flex;align-items:center;justify-content:center;';

  overlay.innerHTML =
    '<div style="background:#fff;border-radius:8px;width:560px;display:flex;flex-direction:column;box-shadow:0 8px 30px rgba(0,0,0,.18);">' +
      '<div style="display:flex;align-items:center;justify-content:space-between;padding:16px 20px;border-bottom:1px solid #f0f0f0;">' +
        '<span style="font-size:16px;font-weight:600;color:#333;">批量审核</span>' +
        '<i class="fa-solid fa-xmark" style="cursor:pointer;color:#999;font-size:16px;" onclick="closeBatchAuditModal()"></i>' +
      '</div>' +
      '<div style="padding:24px 20px;">' +
        '<div style="background:#f7f8fa;border-radius:4px;padding:12px 0;text-align:center;font-size:14px;color:#333;margin-bottom:24px;">已选中X条，请批量审核</div>' +
        '<div style="display:flex;align-items:center;margin-bottom:16px;">' +
          '<span style="width:80px;text-align:right;font-size:13px;color:#666;flex-shrink:0;"><span style="color:#f53f3f;">*</span>审核意见：</span>' +
          '<select style="flex:1;height:34px;border:1px solid #d9d9d9;border-radius:4px;padding:0 10px;font-size:13px;outline:none;box-sizing:border-box;background:#fff;appearance:auto;color:#333;">' +
            '<option selected>通过</option><option>驳回</option>' +
          '</select>' +
        '</div>' +
        '<div style="display:flex;align-items:flex-start;">' +
          '<span style="width:80px;text-align:right;font-size:13px;color:#666;flex-shrink:0;padding-top:6px;">审核说明：</span>' +
          '<textarea rows="4" placeholder="500字符以内" maxlength="500" style="flex:1;border:1px solid #d9d9d9;border-radius:4px;padding:8px 10px;font-size:13px;outline:none;box-sizing:border-box;resize:vertical;color:#999;"></textarea>' +
        '</div>' +
      '</div>' +
      '<div style="padding:14px 20px;border-top:1px solid #f0f0f0;display:flex;justify-content:flex-end;gap:10px;">' +
        '<button class="btn btn-primary btn-sm" style="padding:6px 28px;" onclick="closeBatchAuditModal()">确 定</button>' +
        '<button class="btn btn-sm" style="padding:6px 28px;" onclick="closeBatchAuditModal()">取 消</button>' +
      '</div>' +
    '</div>';

  document.body.appendChild(overlay);
  overlay.addEventListener('click', function(e) { if (e.target === overlay) closeBatchAuditModal(); });
}

function closeBatchAuditModal() {
  var o = document.getElementById('batch-audit-overlay');
  if (o) o.remove();
}

// ============ 指标审核 - Tab 切换 ============
function switchAuditTab(el, tab) {
  el.parentElement.querySelectorAll('.fact-edit-tab').forEach(function(t) { t.classList.remove('active'); });
  el.classList.add('active');
  if (tab === 'pending') renderAuditPendingTab();
  else if (tab === 'processed') renderAuditProcessedTab();
  else if (tab === 'initiated') renderAuditInitiatedTab();
}

function _auditToolbar(showAuditBtn) {
  return '<div class="ind-toolbar">' +
    (showAuditBtn ? '<button class="btn btn-primary btn-sm" style="background:#ff7d00; border-color:#ff7d00" onclick="openBatchAuditModal()">审核</button>' : '') +
    '<div style="flex:1"></div>' +
    '<span style="font-size:13px; color:var(--text-secondary); margin-right:4px">审核状态</span>' +
    '<div class="select-box select-sm" style="min-width:120px">请选择状态 <i class="fa-solid fa-chevron-down"></i></div>' +
    '<span style="font-size:13px; color:var(--text-secondary); margin-right:4px; margin-left:8px">指标名称</span>' +
    '<div class="search-box search-sm"><i class="fa-solid fa-magnifying-glass"></i><input type="text" placeholder="请输入指标名称"></div>' +
    '<button class="btn btn-primary btn-sm">查询</button>' +
    '<button class="btn btn-sm">重置</button>' +
  '</div>' +
  '<div class="dim-icon-bar">' +
    '<span class="dim-toggle-wrap"><input type="checkbox"><span class="dim-toggle-slider"></span></span>' +
    '<i class="fa-solid fa-rotate" title="刷新"></i>' +
    '<i class="fa-solid fa-text-height" title="调整"></i>' +
    '<i class="fa-solid fa-gear" title="设置"></i>' +
    '<i class="fa-solid fa-expand" title="全屏"></i>' +
  '</div>';
}

function _auditTableHead() {
  return '<thead><tr>' +
    '<th style="width:36px"><input type="checkbox"></th>' +
    '<th>所属分类</th><th>指标编码</th><th>指标名称</th><th>指标类型</th><th>维度</th><th>审核状态</th><th>版本</th><th>操作</th>' +
  '</tr></thead>';
}

// ============ 待处理 ============
function renderAuditPendingTab() {
  var el = document.getElementById('audit-tab-content');
  if (!el) return;
  el.innerHTML = _auditToolbar(true) +
    '<div class="ind-table-wrap"><table class="data-table">' + _auditTableHead() +
    '<tbody>' +
      '<tr><td><input type="checkbox"></td><td>人力资源/员工关系/人员...</td><td>CRH000_ID_010003_000033</td><td><a class="action-link">在岗职工人数占职工总人...</a></td><td><span class="badge badge-orange">衍生指标</span></td><td>时间维度</td><td><span class="badge badge-blue">上线审核中</span></td><td>V1</td><td class="op-cell"><a class="action-link" style="color:#ff7d00" onclick="openAuditDetailPage(\'在岗职工人数占职工总人...\',\'CRH000_ID_010003_000033\',\'人力资源/员工关系/人员...\')">审核</a> <a class="action-link" onclick="openAuditViewPage(\'在岗职工人数占职工总人...\',\'CRH000_ID_010003_000033\',\'人力资源/员工关系/人员...\',\'上线审核中\')">详情</a></td></tr>' +
      '<tr><td><input type="checkbox"></td><td>人力资源/员工关系/人员...</td><td>CRH000_ID_010003_000032</td><td><a class="action-link">在岗职工人数</a></td><td><span class="badge badge-green">派生指标</span></td><td>时间维度</td><td><span class="badge badge-blue">上线审核中</span></td><td>V1</td><td class="op-cell"><a class="action-link" style="color:#ff7d00" onclick="openAuditDetailPage(\'在岗职工人数\',\'CRH000_ID_010003_000032\',\'人力资源/员工关系/人员...\')">审核</a> <a class="action-link" onclick="openAuditViewPage(\'在岗职工人数\',\'CRH000_ID_010003_000032\',\'人力资源/员工关系/人员...\',\'上线审核中\')">详情</a></td></tr>' +
      '<tr><td><input type="checkbox"></td><td>人力资源/员工关系/人员...</td><td>CRH000_ID_010003_000031</td><td><a class="action-link">职工人数</a></td><td><span class="badge badge-blue">原子指标</span></td><td>—</td><td><span class="badge badge-blue">上线审核中</span></td><td>V1</td><td class="op-cell"><a class="action-link" style="color:#ff7d00" onclick="openAuditDetailPage(\'职工人数\',\'CRH000_ID_010003_000031\',\'人力资源/员工关系/人员...\')">审核</a> <a class="action-link" onclick="openAuditViewPage(\'职工人数\',\'CRH000_ID_010003_000031\',\'人力资源/员工关系/人员...\',\'上线审核中\')">详情</a></td></tr>' +
    '</tbody></table>' +
    '<div class="pagination" style="padding:12px 16px"><span class="page-info">总共 3 条数据</span><span class="page-nav"><span class="page-btn disabled">&lt;</span><span class="page-btn active">1</span><span class="page-btn disabled">&gt;</span></span><span class="page-size">20 条/页</span></div></div>';
}

// ============ 已处理 ============
function renderAuditProcessedTab() {
  var el = document.getElementById('audit-tab-content');
  if (!el) return;
  el.innerHTML = _auditToolbar(false) +
    '<div class="ind-table-wrap"><table class="data-table">' + _auditTableHead() +
    '<tbody>' +
      '<tr><td><input type="checkbox"></td><td>指标体系/免审</td><td>000018</td><td><a class="action-link">生产订单</a></td><td><span class="badge badge-blue">原子指标</span></td><td>—</td><td><span class="badge badge-green">上线审核通过</span></td><td>V2</td><td class="op-cell"><a class="action-link" onclick="openAuditViewPage(\'生产订单\',\'000018\',\'指标体系/免审\',\'上线审核通过\')">详情</a></td></tr>' +
      '<tr><td><input type="checkbox"></td><td>指标体系</td><td>000011</td><td><a class="action-link">日完成生产订单总数</a></td><td><span class="badge badge-green">派生指标</span></td><td>时间维度</td><td><span class="badge badge-green">上线审核通过</span></td><td>V1</td><td class="op-cell"><a class="action-link" onclick="openAuditViewPage(\'日完成生产订单总数\',\'000011\',\'指标体系\',\'上线审核通过\')">详情</a></td></tr>' +
      '<tr><td><input type="checkbox"></td><td>指标体系</td><td>000009</td><td><a class="action-link">生产订单总数</a></td><td><span class="badge badge-green">派生指标</span></td><td>—</td><td><span class="badge badge-green">上线审核通过</span></td><td>V1</td><td class="op-cell"><a class="action-link" onclick="openAuditViewPage(\'生产订单总数\',\'000009\',\'指标体系\',\'上线审核通过\')">详情</a></td></tr>' +
      '<tr><td><input type="checkbox"></td><td>指标体系</td><td>000005</td><td><a class="action-link">日计划完成率</a></td><td><span class="badge badge-orange">衍生指标</span></td><td>时间维度, 产品维度</td><td><span class="badge badge-green">上线审核通过</span></td><td>V1</td><td class="op-cell"><a class="action-link" onclick="openAuditViewPage(\'日计划完成率\',\'000005\',\'指标体系\',\'上线审核通过\')">详情</a></td></tr>' +
      '<tr><td><input type="checkbox"></td><td>人力资源/员工关系/人员...</td><td>CRH000_ID_010003_000030</td><td><a class="action-link">离退休人员人数</a></td><td><span class="badge badge-green">派生指标</span></td><td>时间维度</td><td><span class="badge badge-red" style="background:#fff1f0;color:#f53f3f;">上线审核驳回</span></td><td>V1</td><td class="op-cell"><a class="action-link" onclick="openAuditViewPage(\'离退休人员人数\',\'CRH000_ID_010003_000030\',\'人力资源/员工关系/人员...\',\'上线审核驳回\')">详情</a></td></tr>' +
    '</tbody></table>' +
    '<div class="pagination" style="padding:12px 16px"><span class="page-info">总共 5 条数据</span><span class="page-nav"><span class="page-btn disabled">&lt;</span><span class="page-btn active">1</span><span class="page-btn disabled">&gt;</span></span><span class="page-size">20 条/页</span></div></div>';
}

// ============ 已发起 ============
function renderAuditInitiatedTab() {
  var el = document.getElementById('audit-tab-content');
  if (!el) return;
  el.innerHTML = _auditToolbar(false) +
    '<div class="ind-table-wrap"><table class="data-table">' + _auditTableHead() +
    '<tbody>' +
      '<tr><td><input type="checkbox"></td><td>人力资源/员工关系/人员...</td><td>CRH000_ID_010003_000033</td><td><a class="action-link">在岗职工人数占职工总人...</a></td><td><span class="badge badge-orange">衍生指标</span></td><td>时间维度</td><td><span class="badge badge-blue">上线审核中</span></td><td>V1</td><td class="op-cell"><a class="action-link" onclick="openAuditViewPage(\'在岗职工人数占职工总人...\',\'CRH000_ID_010003_000033\',\'人力资源/员工关系/人员...\',\'上线审核中\')">详情</a></td></tr>' +
      '<tr><td><input type="checkbox"></td><td>人力资源/员工关系/人员...</td><td>CRH000_ID_010003_000032</td><td><a class="action-link">在岗职工人数</a></td><td><span class="badge badge-green">派生指标</span></td><td>时间维度</td><td><span class="badge badge-blue">上线审核中</span></td><td>V1</td><td class="op-cell"><a class="action-link" onclick="openAuditViewPage(\'在岗职工人数\',\'CRH000_ID_010003_000032\',\'人力资源/员工关系/人员...\',\'上线审核中\')">详情</a></td></tr>' +
      '<tr><td><input type="checkbox"></td><td>人力资源/员工关系/人员...</td><td>CRH000_ID_010003_000031</td><td><a class="action-link">职工人数</a></td><td><span class="badge badge-blue">原子指标</span></td><td>—</td><td><span class="badge badge-blue">上线审核中</span></td><td>V1</td><td class="op-cell"><a class="action-link" onclick="openAuditViewPage(\'职工人数\',\'CRH000_ID_010003_000031\',\'人力资源/员工关系/人员...\',\'上线审核中\')">详情</a></td></tr>' +
      '<tr><td><input type="checkbox"></td><td>财务数据指标</td><td>000017</td><td><a class="action-link">营业收入</a></td><td><span class="badge badge-blue">原子指标</span></td><td>—</td><td><span style="color:var(--text-tertiary)">—</span></td><td>V1</td><td class="op-cell"><a class="action-link" onclick="openAuditViewPage(\'营业收入\',\'000017\',\'财务数据指标\',\'—\')">详情</a></td></tr>' +
    '</tbody></table>' +
    '<div class="pagination" style="padding:12px 16px"><span class="page-info">总共 4 条数据</span><span class="page-nav"><span class="page-btn disabled">&lt;</span><span class="page-btn active">1</span><span class="page-btn disabled">&gt;</span></span><span class="page-size">20 条/页</span></div></div>';
}

// ============ 指标审核 - 详情页面（只读） ============
function openAuditViewPage(name, code, category, status) {
  var contentArea = document.getElementById('content-area');
  name = name || '职工人数';
  code = code || 'CRH000_ID_010003_000031';
  category = category || '人力资源/员工关系/人员...';
  status = status || '上线审核通过';

  var auditRecords = [
    { time:'2026-03-01 10:15:23', user:'张三', status:'上线申请', desc:'新增指标，申请上线' },
    { time:'2026-03-01 14:32:08', user:'李四', status:'上线审核通过', desc:'审核通过，指标定义规范，数据口径清晰' },
    { time:'2026-02-20 09:45:11', user:'张三', status:'上线申请', desc:'首次提交上线申请' },
    { time:'2026-02-20 16:20:37', user:'王五', status:'上线审核驳回', desc:'指标描述不够完整，请补充计算逻辑说明' },
    { time:'2026-02-21 11:08:44', user:'张三', status:'上线申请', desc:'已补充计算逻辑，重新申请' },
  ];

  var recordRows = auditRecords.map(function(r) {
    var statusColor = r.status.indexOf('通过') > -1 ? '#00b42a' : r.status.indexOf('驳回') > -1 ? '#f53f3f' : '#3370ff';
    return '<tr><td>' + r.time + '</td><td>' + r.user + '</td><td><span style="color:' + statusColor + '">' + r.status + '</span></td><td>' + r.desc + '</td></tr>';
  }).join('');

  var valStyle = 'font-size:13px;color:#333;';
  var labelStyle = 'display:inline-block;width:80px;text-align:right;font-size:13px;color:#999;flex-shrink:0;';
  var rowStyle = 'display:flex;align-items:center;margin-bottom:14px;';

  var statusBadge = '';
  if (status.indexOf('通过') > -1) statusBadge = '<span class="badge badge-green">' + status + '</span>';
  else if (status.indexOf('审核中') > -1) statusBadge = '<span class="badge badge-blue">' + status + '</span>';
  else if (status.indexOf('驳回') > -1) statusBadge = '<span class="badge badge-red" style="background:#fff1f0;color:#f53f3f;">' + status + '</span>';
  else statusBadge = '<span style="color:var(--text-tertiary);">' + status + '</span>';

  contentArea.innerHTML =
    '<div class="edit-page">' +
      '<div class="edit-page-header">' +
        '<span class="edit-page-title"><i class="fa-regular fa-file-lines" style="margin-right:6px;color:var(--text-tertiary)"></i>指标审核详情</span>' +
        '<div class="edit-page-actions">' +
          '<button class="btn btn-sm" onclick="loadPage(\'indicator-audit\')">返 回</button>' +
        '</div>' +
      '</div>' +
      '<div class="edit-page-body" style="padding:0;flex:1;overflow:hidden;display:flex;flex-direction:column;">' +
        '<div style="display:flex;gap:0;align-items:stretch;flex:1;overflow:hidden;">' +

          '<div style="flex:1;min-width:0;overflow-y:auto;padding:20px 24px;border-right:1px solid #f0f0f0;">' +
            '<div style="font-size:14px;font-weight:600;color:#333;margin-bottom:16px;border-bottom:1px solid #f0f0f0;padding-bottom:10px;">审核说明</div>' +

            '<div style="' + rowStyle + '">' +
              '<span style="' + labelStyle + '">审核状态：</span>' +
              '<div style="flex:1;">' + statusBadge + '</div>' +
            '</div>' +

            '<div style="' + rowStyle + '">' +
              '<span style="' + labelStyle + '">处理意见：</span>' +
              '<span style="' + valStyle + '">审核通过，指标定义规范，数据口径清晰</span>' +
            '</div>' +

            '<div style="' + rowStyle + '">' +
              '<span style="' + labelStyle + '">审核人：</span>' +
              '<span style="' + valStyle + '">李四</span>' +
            '</div>' +

            '<div style="' + rowStyle + '">' +
              '<span style="' + labelStyle + '">审核时间：</span>' +
              '<span style="' + valStyle + '">2026-03-01 14:32:08</span>' +
            '</div>' +

            '<div style="' + rowStyle + '">' +
              '<span style="' + labelStyle + '">申请人：</span>' +
              '<span style="' + valStyle + '">张三</span>' +
            '</div>' +

            '<div style="' + rowStyle + '">' +
              '<span style="' + labelStyle + '">申请时间：</span>' +
              '<span style="' + valStyle + '">2026-03-01 10:15:23</span>' +
            '</div>' +

            '<div style="' + rowStyle + '">' +
              '<span style="' + labelStyle + '">申请理由：</span>' +
              '<span style="' + valStyle + '">新增指标，申请上线</span>' +
            '</div>' +

            '<div style="font-size:14px;font-weight:600;color:#333;margin:24px 0 12px;border-bottom:1px solid #f0f0f0;padding-bottom:10px;">审核记录</div>' +
            '<table class="data-table" style="font-size:12px;">' +
              '<thead><tr><th>时间</th><th>操作者</th><th>审核状态</th><th>申请/审核说明</th></tr></thead>' +
              '<tbody>' + recordRows + '</tbody>' +
            '</table>' +
          '</div>' +

          '<div style="flex:1;min-width:0;overflow-y:auto;padding:20px 24px;">' +
            '<div style="font-size:14px;font-weight:600;color:#333;margin-bottom:16px;border-bottom:1px solid #f0f0f0;padding-bottom:10px;">指标信息（基本信息）</div>' +
            _buildIndicatorBasicInfo(name, code, null, category) +
          '</div>' +

        '</div>' +
      '</div>' +
    '</div>';
}
