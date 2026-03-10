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
                <td><input type="checkbox"></td>
                <td>人力资源/员工关系/人员...</td>
                <td>CRH000_ID_010003_000033</td>
                <td><a class="action-link">在岗职工人数占职工总人...</a></td>
                <td><span class="badge badge-orange">衍生指标</span></td>
                <td>时间维度</td>
                <td><span class="badge badge-blue">上线审核中</span></td>
                <td>V1</td>
                <td class="op-cell"><a class="action-link" style="color:#ff7d00">审核</a> <a class="action-link">详情</a></td>
              </tr>
              <tr>
                <td><input type="checkbox"></td>
                <td>人力资源/员工关系/人员...</td>
                <td>CRH000_ID_010003_000032</td>
                <td><a class="action-link">在岗职工人数</a></td>
                <td><span class="badge badge-green">派生指标</span></td>
                <td>时间维度</td>
                <td><span class="badge badge-blue">上线审核中</span></td>
                <td>V1</td>
                <td class="op-cell"><a class="action-link" style="color:#ff7d00">审核</a> <a class="action-link">详情</a></td>
              </tr>
              <tr>
                <td><input type="checkbox"></td>
                <td>人力资源/员工关系/人员...</td>
                <td>CRH000_ID_010003_000031</td>
                <td><a class="action-link">职工人数</a></td>
                <td><span class="badge badge-blue">原子指标</span></td>
                <td>—</td>
                <td><span class="badge badge-blue">上线审核中</span></td>
                <td>V1</td>
                <td class="op-cell"><a class="action-link" style="color:#ff7d00">审核</a> <a class="action-link">详情</a></td>
              </tr>
              <tr>
                <td><input type="checkbox"></td>
                <td>指标体系/免审</td>
                <td>000018</td>
                <td><a class="action-link">生产订单</a></td>
                <td><span class="badge badge-blue">原子指标</span></td>
                <td>—</td>
                <td><span class="badge badge-green">上线审核通过</span></td>
                <td>V2</td>
                <td class="op-cell"><a class="action-link">详情</a></td>
              </tr>
              <tr>
                <td><input type="checkbox"></td>
                <td>指标体系</td>
                <td>000011</td>
                <td><a class="action-link">日完成生产订单总数</a></td>
                <td><span class="badge badge-green">派生指标</span></td>
                <td>时间维度</td>
                <td><span class="badge badge-green">上线审核通过</span></td>
                <td>V1</td>
                <td class="op-cell"><a class="action-link">详情</a></td>
              </tr>
              <tr>
                <td><input type="checkbox"></td>
                <td>指标体系</td>
                <td>000009</td>
                <td><a class="action-link">生产订单总数</a></td>
                <td><span class="badge badge-green">派生指标</span></td>
                <td>—</td>
                <td><span class="badge badge-green">上线审核通过</span></td>
                <td>V1</td>
                <td class="op-cell"><a class="action-link">详情</a></td>
              </tr>
              <tr>
                <td><input type="checkbox"></td>
                <td>指标体系</td>
                <td>000005</td>
                <td><a class="action-link">日计划完成率</a></td>
                <td><span class="badge badge-orange">衍生指标</span></td>
                <td>时间维度, 产品维度</td>
                <td><span class="badge badge-green">上线审核通过</span></td>
                <td>V1</td>
                <td class="op-cell"><a class="action-link">详情</a></td>
              </tr>
              <tr>
                <td><input type="checkbox"></td>
                <td>财务数据指标</td>
                <td>000017</td>
                <td><a class="action-link">营业收入</a></td>
                <td><span class="badge badge-blue">原子指标</span></td>
                <td>—</td>
                <td><span style="color:var(--text-tertiary)">—</span></td>
                <td>V1</td>
                <td class="op-cell"><a class="action-link">详情</a></td>
              </tr>
            </tbody>
          </table>
          <div class="pagination" style="padding:12px 16px">
            <span class="page-info">总共 8 条数据</span>
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
