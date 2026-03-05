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
