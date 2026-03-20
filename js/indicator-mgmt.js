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
          <button class="btn btn-sm" onclick="openImportModal()"><i class="fa-solid fa-download"></i> 导入</button>
          <button class="btn btn-sm"><i class="fa-solid fa-upload"></i> 导出</button>
          <button class="btn btn-sm"><i class="fa-solid fa-arrow-up"></i> 上线</button>
          <button class="btn btn-sm"><i class="fa-solid fa-arrow-down"></i> 下线</button>
          <button class="btn btn-sm" style="color:#f53f3f; border-color:#f53f3f" onclick="confirmBatchDelete(3)"><i class="fa-regular fa-trash-can"></i> 删除</button>
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
            <span class="page-info">总共 10 条数据</span>
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
    { cat: '人力资源/员工关系/人员...', code: 'CRH000_ID_010003_000033', name: '在岗职工人数占职工总人...', type: '衍生指标', lock: '已锁定', online: '已上线', audit: '—', ver: 'V1' },
    { cat: '人力资源/员工关系/人员...', code: 'CRH000_ID_010003_000032', name: '在岗职工人数', type: '派生指标', lock: '已锁定', online: '已上线', audit: '—', ver: 'V1' },
    { cat: '人力资源/员工关系/人员...', code: 'CRH000_ID_010003_000031', name: '职工人数', type: '原子指标', lock: '已锁定', online: '已上线', audit: '—', ver: 'V1' },
    { cat: '指标体系/免审', code: '000018', name: '生产订单', type: '原子指标', lock: '已锁定', online: '已上线', audit: '—', ver: 'V2' },
    { cat: '财务数据指标', code: '000017', name: '营业收入', type: '原子指标', lock: '已锁定', online: '未上线', audit: '—', ver: 'V1' },
    { cat: '指标体系', code: '000012', name: '关闭生产订单数量', type: '派生指标', lock: '已锁定', online: '未上线', audit: '—', ver: 'V1' },
    { cat: '指标体系', code: '000013', name: '取消生产订单数量', type: '派生指标', lock: '已锁定', online: '已上线', audit: '—', ver: 'V1' },
    { cat: '指标体系', code: '000010', name: '周完成生产订单总数', type: '派生指标', lock: '已锁定', online: '已上线', audit: '—', ver: 'V1' },
    { cat: '指标体系', code: '000011', name: '日完成生产订单总数', type: '派生指标', lock: '已锁定', online: '已上线', audit: '上线审核通过', ver: 'V1' },
    { cat: '指标体系', code: '000009', name: '生产订单总数', type: '派生指标', lock: '已锁定', online: '已上线', audit: '上线审核通过', ver: 'V1' },
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
          <a class="action-link" onclick="openIndicatorDetail('${row.name}','${row.code}','${row.type}','${row.cat}')">详情</a>
          <a class="action-link" onclick="openIndicatorForm('edit')">编辑</a>
          <a class="action-link" onclick="${bindFn}">数据绑定</a>
          <a class="action-link" style="color:#f53f3f" onclick="confirmDelete('${row.name}')">删除</a>
          <span class="more-actions" onclick="toggleMoreMenu(this)">···
            <div class="more-menu">
              <a onclick="openVersionPage('${row.name}')">版本管理</a>
              <a onclick="openRelationGraph()">指标关系图</a>
              <a onclick="alert('上线：${row.name}')">上线</a>
              <a onclick="alert('下线：${row.name}')">下线</a>
              <a onclick="openPreviewModal()">执行预览</a>
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
  const d = data || {
    seq: isEdit ? '1' : '', category:'', catCode1:'', catName1:'', catCode2:'', catName2:'', catCode3:'', catName3:'',
    code: isEdit ? '000021' : '', name: isEdit ? '日完成占比' : '',
    type: isEdit ? '衍生指标' : '', definition:'', caliber:'',
    formula:'', unit: isEdit ? '%' : '',
    physTableCn:'', physTableEn:'', physFieldCn:'', physFieldEn:'',
    defDept:'', mgmtDept:'', importance:'', isValid:'', author:'',
    timePeriod:'', version:'V1'
  };
  const h = '<i class="fa-regular fa-circle-question help-icon"></i>';

  contentArea.innerHTML = `
    <div class="edit-page">
      <div class="edit-page-header">
        <span class="edit-page-title">${isEdit ? '编辑指标' : '新建指标'}${isEdit ? '(指标版本：'+d.version+')' : ''}</span>
        <div class="edit-page-actions">
          <button class="btn btn-sm" onclick="loadPage('indicator-mgmt')">返回</button>
          <button class="btn btn-primary btn-sm" onclick="loadPage('indicator-mgmt')">保存</button>
        </div>
      </div>
      <div class="edit-page-body">
        <div class="form-grid">
          <!-- 序号（无分组） -->
          <div class="form-row">
            <div class="form-cell">
              <div class="form-group">
                <label class="form-label required">序号</label>
                <div class="form-field">
                  <input type="text" class="form-control" value="${d.seq}">
                  ${h}
                </div>
              </div>
            </div>
            <div class="form-cell"></div>
          </div>

          <!-- ===== 分类属性 ===== -->
          <div style="display:flex;align-items:center;gap:8px;padding:10px 0 6px 0;margin-top:8px;border-bottom:1px solid #e8e8e8;margin-bottom:8px;">
            <i class="fa-solid fa-layer-group" style="color:#1890ff;font-size:13px;"></i>
            <span style="font-size:14px;font-weight:600;color:#333;">分类属性</span>
          </div>
          <div class="form-row">
            <div class="form-cell">
              <div class="form-group">
                <label class="form-label required">所属分类</label>
                <div class="form-field" style="position:relative;">
                  <div class="form-control" style="display:flex;align-items:center;justify-content:space-between;cursor:pointer;min-height:32px;color:#999;" onclick="toggleCategoryTree(this)">
                    <span id="cat-tree-selected">${d.category || '请选择所属分类'}</span>
                    <i class="fa-solid fa-magnifying-glass" style="color:#bbb;font-size:12px;"></i>
                  </div>
                  <div id="cat-tree-dropdown" style="display:none;position:absolute;top:100%;left:0;right:0;z-index:100;background:#fff;border:1px solid #d9d9d9;border-radius:4px;box-shadow:0 4px 12px rgba(0,0,0,.12);max-height:280px;overflow-y:auto;margin-top:2px;padding:6px 0;">
                    <div class="cat-tree-node" style="padding:5px 12px;cursor:pointer;display:flex;align-items:center;gap:6px;" onclick="selectCatTreeNode(this,'财务数据指标')">
                      <i class="fa-solid fa-folder" style="color:#f5a623;font-size:13px;"></i><span style="font-size:13px;color:#333;">财务数据指标</span>
                    </div>
                    <div style="padding:5px 12px;cursor:pointer;display:flex;align-items:center;gap:6px;" onclick="this.querySelector('.cat-sub').style.display=this.querySelector('.cat-sub').style.display==='none'?'block':'none'; var c=this.querySelector('.cat-caret');c.style.transform=c.style.transform==='rotate(90deg)'?'rotate(0deg)':'rotate(90deg)';">
                      <i class="fa-solid fa-caret-right cat-caret" style="color:#999;font-size:10px;width:10px;transition:transform .2s;transform:rotate(90deg);"></i>
                      <i class="fa-solid fa-folder-open" style="color:#f5a623;font-size:13px;"></i><span style="font-size:13px;color:#333;">指标体系</span>
                    </div>
                    <div class="cat-sub" style="display:block;">
                      <div class="cat-tree-node" style="padding:5px 12px 5px 40px;cursor:pointer;display:flex;align-items:center;gap:6px;" onclick="event.stopPropagation();selectCatTreeNode(this,'免审')">
                        <i class="fa-solid fa-folder" style="color:#f5a623;font-size:13px;"></i><span style="font-size:13px;color:#333;">免审</span>
                      </div>
                    </div>
                    <div style="padding:5px 12px;cursor:pointer;display:flex;align-items:center;gap:6px;" onclick="this.querySelector('.cat-sub').style.display=this.querySelector('.cat-sub').style.display==='none'?'block':'none'; var c=this.querySelector('.cat-caret');c.style.transform=c.style.transform==='rotate(90deg)'?'rotate(0deg)':'rotate(90deg)';">
                      <i class="fa-solid fa-caret-right cat-caret" style="color:#999;font-size:10px;width:10px;transition:transform .2s;transform:rotate(90deg);"></i>
                      <i class="fa-solid fa-folder-open" style="color:#f5a623;font-size:13px;"></i><span style="font-size:13px;color:#333;">华润集团</span>
                    </div>
                    <div class="cat-sub" style="display:block;">
                      <div class="cat-tree-node" style="padding:5px 12px 5px 40px;cursor:pointer;display:flex;align-items:center;gap:6px;" onclick="event.stopPropagation();selectCatTreeNode(this,'集团（不区分业态）')">
                        <i class="fa-solid fa-folder" style="color:#f5a623;font-size:13px;"></i><span style="font-size:13px;color:#333;">集团（不区分业态）</span>
                      </div>
                    </div>
                    <div style="padding:5px 12px;cursor:pointer;display:flex;align-items:center;gap:6px;" onclick="this.querySelector('.cat-sub').style.display=this.querySelector('.cat-sub').style.display==='none'?'block':'none'; var c=this.querySelector('.cat-caret');c.style.transform=c.style.transform==='rotate(90deg)'?'rotate(0deg)':'rotate(90deg)';">
                      <i class="fa-solid fa-caret-right cat-caret" style="color:#999;font-size:10px;width:10px;transition:transform .2s;transform:rotate(90deg);"></i>
                      <i class="fa-solid fa-folder-open" style="color:#f5a623;font-size:13px;"></i><span style="font-size:13px;color:#333;">人力资源</span>
                    </div>
                    <div class="cat-sub" style="display:block;">
                      <div style="padding:5px 12px 5px 40px;cursor:pointer;display:flex;align-items:center;gap:6px;" onclick="event.stopPropagation();this.querySelector('.cat-sub').style.display=this.querySelector('.cat-sub').style.display==='none'?'block':'none'; var c=this.querySelector('.cat-caret');c.style.transform=c.style.transform==='rotate(90deg)'?'rotate(0deg)':'rotate(90deg)';">
                        <i class="fa-solid fa-caret-right cat-caret" style="color:#999;font-size:10px;width:10px;transition:transform .2s;transform:rotate(90deg);"></i>
                        <i class="fa-solid fa-folder-open" style="color:#f5a623;font-size:13px;"></i><span style="font-size:13px;color:#333;">员工关系</span>
                      </div>
                      <div class="cat-sub" style="display:block;">
                        <div class="cat-tree-node" style="padding:5px 12px 5px 68px;cursor:pointer;display:flex;align-items:center;gap:6px;" onclick="event.stopPropagation();selectCatTreeNode(this,'人员规模')">
                          <i class="fa-solid fa-folder" style="color:#f5a623;font-size:13px;"></i><span style="font-size:13px;color:#333;">人员规模</span>
                        </div>
                      </div>
                    </div>
                  </div>
                  ${h}
                </div>
              </div>
            </div>
            <div class="form-cell">
              <div class="form-group">
                <label class="form-label required">一级数据分类编码</label>
                <div class="form-field">
                  <input type="text" class="form-control" value="${d.catCode1}" placeholder="请输入">
                  ${h}
                </div>
              </div>
            </div>
          </div>
          <div class="form-row">
            <div class="form-cell">
              <div class="form-group">
                <label class="form-label required">一级数据分类名称</label>
                <div class="form-field">
                  <input type="text" class="form-control" value="${d.catName1}" placeholder="请输入">
                  ${h}
                </div>
              </div>
            </div>
            <div class="form-cell">
              <div class="form-group">
                <label class="form-label required">二级数据分类编码</label>
                <div class="form-field">
                  <input type="text" class="form-control" value="${d.catCode2}" placeholder="请输入">
                  ${h}
                </div>
              </div>
            </div>
          </div>
          <div class="form-row">
            <div class="form-cell">
              <div class="form-group">
                <label class="form-label required">二级数据分类名称</label>
                <div class="form-field">
                  <input type="text" class="form-control" value="${d.catName2}" placeholder="请输入">
                  ${h}
                </div>
              </div>
            </div>
            <div class="form-cell">
              <div class="form-group">
                <label class="form-label required">三级数据分类编码</label>
                <div class="form-field">
                  <input type="text" class="form-control" value="${d.catCode3}" placeholder="请输入">
                  ${h}
                </div>
              </div>
            </div>
          </div>
          <div class="form-row">
            <div class="form-cell">
              <div class="form-group">
                <label class="form-label required">三级数据分类名称</label>
                <div class="form-field">
                  <input type="text" class="form-control" value="${d.catName3}" placeholder="请输入">
                  ${h}
                </div>
              </div>
            </div>
            <div class="form-cell"></div>
          </div>

          <!-- ===== 业务属性 ===== -->
          <div style="display:flex;align-items:center;gap:8px;padding:10px 0 6px 0;margin-top:8px;border-bottom:1px solid #e8e8e8;margin-bottom:8px;">
            <i class="fa-solid fa-layer-group" style="color:#1890ff;font-size:13px;"></i>
            <span style="font-size:14px;font-weight:600;color:#333;">业务属性</span>
          </div>
          <div class="form-row">
            <div class="form-cell">
              <div class="form-group">
                <label class="form-label required">指标编码</label>
                <div class="form-field">
                  <input type="text" class="form-control" value="${d.code || '自动生成'}" readonly style="background:#e8f7ff; color:#1890ff">
                  ${h}
                </div>
              </div>
            </div>
            <div class="form-cell">
              <div class="form-group">
                <label class="form-label required">指标名称</label>
                <div class="form-field">
                  <input type="text" class="form-control" value="${d.name}" placeholder="请输入">
                  ${h}
                </div>
              </div>
            </div>
          </div>
          <div class="form-row">
            <div class="form-cell">
              <div class="form-group">
                <label class="form-label required">指标定义</label>
                <div class="form-field">
                  <textarea class="form-control" placeholder="请输入" rows="2">${d.definition}</textarea>
                  ${h}
                </div>
              </div>
            </div>
            <div class="form-cell">
              <div class="form-group">
                <label class="form-label">指标口径</label>
                <div class="form-field">
                  <textarea class="form-control" placeholder="请输入" rows="2">${d.caliber}</textarea>
                  ${h}
                </div>
              </div>
            </div>
          </div>
          <div class="form-row">
            <div class="form-cell">
              <div class="form-group">
                <label class="form-label">计算公式</label>
                <div class="form-field">
                  <textarea class="form-control" placeholder="请输入" rows="2">${d.formula}</textarea>
                  ${h}
                </div>
              </div>
            </div>
            <div class="form-cell">
              <div class="form-group">
                <label class="form-label required">指标类别</label>
                <div class="form-field">
                  <select class="form-control form-select">
                    <option value="">请选择</option>
                    <option ${d.type==='原子指标'?'selected':''}>原子指标</option>
                    <option ${d.type==='派生指标'?'selected':''}>派生指标</option>
                    <option ${d.type==='衍生指标'?'selected':''}>衍生指标</option>
                  </select>
                  ${h}
                </div>
              </div>
            </div>
          </div>
          <div class="form-row">
            <div class="form-cell">
              <div class="form-group">
                <label class="form-label required">计量单位</label>
                <div class="form-field">
                  <input type="text" class="form-control" value="${d.unit}" placeholder="请输入">
                  ${h}
                </div>
              </div>
            </div>
            <div class="form-cell"></div>
          </div>

          <!-- ===== 技术属性 ===== -->
          <div style="display:flex;align-items:center;gap:8px;padding:10px 0 6px 0;margin-top:8px;border-bottom:1px solid #e8e8e8;margin-bottom:8px;">
            <i class="fa-solid fa-layer-group" style="color:#1890ff;font-size:13px;"></i>
            <span style="font-size:14px;font-weight:600;color:#333;">技术属性</span>
          </div>
          <div class="form-row">
            <div class="form-cell">
              <div class="form-group">
                <label class="form-label">物理表中文名称</label>
                <div class="form-field">
                  <input type="text" class="form-control" value="${d.physTableCn}" placeholder="请输入">
                  ${h}
                </div>
              </div>
            </div>
            <div class="form-cell">
              <div class="form-group">
                <label class="form-label">物理表英文名称</label>
                <div class="form-field">
                  <input type="text" class="form-control" value="${d.physTableEn}" placeholder="请输入">
                  ${h}
                </div>
              </div>
            </div>
          </div>
          <div class="form-row">
            <div class="form-cell">
              <div class="form-group">
                <label class="form-label">物理字段中文名称</label>
                <div class="form-field">
                  <input type="text" class="form-control" value="${d.physFieldCn}" placeholder="请输入">
                  ${h}
                </div>
              </div>
            </div>
            <div class="form-cell">
              <div class="form-group">
                <label class="form-label">物理字段英文名称</label>
                <div class="form-field">
                  <input type="text" class="form-control" value="${d.physFieldEn}" placeholder="请输入">
                  ${h}
                </div>
              </div>
            </div>
          </div>

          <!-- ===== 管理属性 ===== -->
          <div style="display:flex;align-items:center;gap:8px;padding:10px 0 6px 0;margin-top:8px;border-bottom:1px solid #e8e8e8;margin-bottom:8px;">
            <i class="fa-solid fa-layer-group" style="color:#1890ff;font-size:13px;"></i>
            <span style="font-size:14px;font-weight:600;color:#333;">管理属性</span>
          </div>
          <div class="form-row">
            <div class="form-cell">
              <div class="form-group">
                <label class="form-label required">指标定义部门</label>
                <div class="form-field">
                  <input type="text" class="form-control" value="${d.defDept}" placeholder="请输入">
                  ${h}
                </div>
              </div>
            </div>
            <div class="form-cell">
              <div class="form-group">
                <label class="form-label required">指标管理部门</label>
                <div class="form-field">
                  <input type="text" class="form-control" value="${d.mgmtDept}" placeholder="请输入">
                  ${h}
                </div>
              </div>
            </div>
          </div>
          <div class="form-row">
            <div class="form-cell">
              <div class="form-group">
                <label class="form-label required">数据重要程度</label>
                <div class="form-field">
                  <select class="form-control form-select">
                    <option value="">请选择</option>
                    <option ${d.importance==='一般'?'selected':''}>一般</option>
                    <option ${d.importance==='重要'?'selected':''}>重要</option>
                    <option ${d.importance==='核心'?'selected':''}>核心</option>
                  </select>
                  ${h}
                </div>
              </div>
            </div>
            <div class="form-cell">
              <div class="form-group">
                <label class="form-label required">是否有效</label>
                <div class="form-field">
                  <select class="form-control form-select">
                    <option value="">请选择</option>
                    <option ${d.isValid==='是'?'selected':''}>是</option>
                    <option ${d.isValid==='否'?'selected':''}>否</option>
                  </select>
                  ${h}
                </div>
              </div>
            </div>
          </div>
          <div class="form-row">
            <div class="form-cell">
              <div class="form-group">
                <label class="form-label required">填写人</label>
                <div class="form-field">
                  <input type="text" class="form-control" value="${d.author}" placeholder="请输入">
                  ${h}
                </div>
              </div>
            </div>
            <div class="form-cell"></div>
          </div>

          <!-- ===== 系统属性 ===== -->
          <div style="display:flex;align-items:center;gap:8px;padding:10px 0 6px 0;margin-top:8px;border-bottom:1px solid #e8e8e8;margin-bottom:8px;">
            <i class="fa-solid fa-layer-group" style="color:#1890ff;font-size:13px;"></i>
            <span style="font-size:14px;font-weight:600;color:#333;">系统属性</span>
          </div>
          <div class="form-row">
            <div class="form-cell">
              <div class="form-group">
                <label class="form-label">维度</label>
                <div class="form-field">
                  <span style="display:inline-flex; align-items:center; gap:4px; line-height:32px; cursor:pointer; position:relative;" onclick="event.stopPropagation(); toggleDimFilterPanel(this);">
                    <i class="fa-solid fa-circle-plus" style="color:#1890ff;"></i>
                    <a href="#" onclick="event.preventDefault()" style="color:#1890ff; text-decoration:none; font-size:13px;">添加维度</a>
                  </span>
                  ${h}
                </div>
              </div>
            </div>
            <div class="form-cell">
              <div class="form-group">
                <label class="form-label">时间周期</label>
                <div class="form-field">
                  <select class="form-control form-select">
                    <option value="">请选择</option>
                    <option ${d.timePeriod==='年'?'selected':''}>年</option>
                    <option ${d.timePeriod==='半年'?'selected':''}>半年</option>
                    <option ${d.timePeriod==='季度'?'selected':''}>季度</option>
                    <option ${d.timePeriod==='月'?'selected':''}>月</option>
                    <option ${d.timePeriod==='周'?'selected':''}>周</option>
                    <option ${d.timePeriod==='日'?'selected':''}>日</option>
                  </select>
                  ${h}
                </div>
              </div>
            </div>
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
        <div style="padding:8px 12px; position:relative;">
          <div style="display:flex; gap:6px; align-items:center; margin-bottom:8px;">
            <div style="flex:1; position:relative;">
              <div class="form-control" style="height:28px; font-size:12px; display:flex; align-items:center; justify-content:space-between; cursor:pointer; padding:0 8px; min-width:0;" onclick="toggleBindingTree(this)">
                <span id="binding-tree-selected" style="overflow:hidden; text-overflow:ellipsis; white-space:nowrap; color:#333;">华润员工信息统计表</span>
                <i class="fa-solid fa-magnifying-glass" style="color:#bbb; font-size:11px; flex-shrink:0;"></i>
              </div>
              <div id="binding-tree-dropdown" style="display:none; position:absolute; top:100%; left:0; right:0; z-index:200; background:#fff; border:1px solid #d9d9d9; border-radius:4px; box-shadow:0 4px 12px rgba(0,0,0,.15); max-height:320px; overflow-y:auto; margin-top:2px; padding:6px 0; min-width:220px;">
                <div style="padding:4px 10px; cursor:pointer; font-size:12px; color:#333;" onclick="event.stopPropagation(); selectBindingTreeNode(this,'订单及时交付率1111')">
                  <span style="padding:3px 6px; display:block;">订单及时交付率1111</span>
                </div>
                <div style="padding:0 10px;">
                  <div style="display:flex; align-items:center; gap:4px; padding:4px 6px; cursor:pointer; font-size:12px; color:#999;" onclick="event.stopPropagation(); var s=this.nextElementSibling; s.style.display=s.style.display==='none'?'block':'none'; var c=this.querySelector('.bt-caret'); c.style.transform=c.style.transform==='rotate(90deg)'?'rotate(0deg)':'rotate(90deg)';">
                    <i class="fa-solid fa-caret-right bt-caret" style="font-size:9px; width:8px; transition:transform .2s; transform:rotate(90deg); color:#999;"></i>
                    <i class="fa-solid fa-folder-open" style="color:#f5a623; font-size:12px;"></i><span>维度数据集</span>
                  </div>
                  <div style="display:block; padding-left:18px;">
                    <div style="padding:3px 6px; cursor:pointer; font-size:12px; color:#333;" onclick="event.stopPropagation(); selectBindingTreeNode(this,'设备维度数据')">设备维度数据</div>
                  </div>
                </div>
                <div style="padding:0 10px;">
                  <div style="display:flex; align-items:center; gap:4px; padding:4px 6px; cursor:pointer; font-size:12px; color:#999;" onclick="event.stopPropagation(); var s=this.nextElementSibling; s.style.display=s.style.display==='none'?'block':'none'; var c=this.querySelector('.bt-caret'); c.style.transform=c.style.transform==='rotate(90deg)'?'rotate(0deg)':'rotate(90deg)';">
                    <i class="fa-solid fa-caret-right bt-caret" style="font-size:9px; width:8px; transition:transform .2s; transform:rotate(90deg); color:#999;"></i>
                    <i class="fa-solid fa-folder-open" style="color:#f5a623; font-size:12px;"></i><span>指标体系</span>
                  </div>
                  <div style="display:block; padding-left:18px;">
                    <div style="padding:3px 6px; cursor:pointer; font-size:12px; color:#333;" onclick="event.stopPropagation(); selectBindingTreeNode(this,'员工信息表')">员工信息表</div>
                    <div style="padding:3px 6px; cursor:pointer; font-size:12px; color:#333;" onclick="event.stopPropagation(); selectBindingTreeNode(this,'生产订单表')">生产订单表</div>
                  </div>
                </div>
                <div style="padding:0 10px;">
                  <div style="display:flex; align-items:center; gap:4px; padding:4px 6px; cursor:pointer; font-size:12px; color:#999;" onclick="event.stopPropagation(); var s=this.nextElementSibling; s.style.display=s.style.display==='none'?'block':'none'; var c=this.querySelector('.bt-caret'); c.style.transform=c.style.transform==='rotate(90deg)'?'rotate(0deg)':'rotate(90deg)';">
                    <i class="fa-solid fa-caret-right bt-caret" style="font-size:9px; width:8px; transition:transform .2s; transform:rotate(90deg); color:#999;"></i>
                    <i class="fa-solid fa-folder" style="color:#f5a623; font-size:12px;"></i><span>事实表</span>
                  </div>
                  <div style="display:block; padding-left:18px;">
                    <div style="display:flex; align-items:center; gap:4px; padding:4px 6px; cursor:pointer; font-size:12px; color:#999;" onclick="event.stopPropagation(); var s=this.nextElementSibling; s.style.display=s.style.display==='none'?'block':'none'; var c=this.querySelector('.bt-caret'); c.style.transform=c.style.transform==='rotate(90deg)'?'rotate(0deg)':'rotate(90deg)';">
                      <i class="fa-solid fa-caret-right bt-caret" style="font-size:9px; width:8px; transition:transform .2s; transform:rotate(90deg); color:#999;"></i>
                      <i class="fa-solid fa-folder-open" style="color:#f5a623; font-size:12px;"></i><span>财务分类</span>
                    </div>
                    <div style="display:block; padding-left:18px;">
                      <div style="padding:3px 6px; cursor:pointer; font-size:12px; color:#fff; background:#1890ff; border-radius:3px;" onclick="event.stopPropagation(); selectBindingTreeNode(this,'华润员工信息统计表')">华润员工信息统计表</div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <i class="fa-solid fa-right-to-bracket" style="color:var(--primary-blue); cursor:pointer; font-size:13px;"></i>
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
            <button class="btn btn-primary btn-sm" onclick="loadPage('indicator-mgmt')">保存</button>
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
        <button class="btn btn-sm" onclick="openSelectIndicatorModal()"><i class="fa-solid fa-check-circle" style="color:var(--primary-blue)"></i> 选择指标</button>
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
          <button class="btn btn-primary btn-sm" onclick="loadPage('indicator-mgmt')">保存</button>
        </div>
      </div>
      <div class="edit-page-body" style="padding:20px 24px">
        <!-- 基本配置 -->
        <div class="section-title">基本配置</div>
        <div style="margin:16px 0">
          <button class="btn btn-primary btn-sm" onclick="openSelectIndicatorModal()">选择原子指标</button>
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
          <button class="btn btn-sm" onclick="openSelectIndicatorModal()"><i class="fa-solid fa-check-circle" style="color:var(--primary-blue)"></i> 选择指标</button>
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
                <th>时间周期</th>
                <th>版本</th>
                <th>过滤条件</th>
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
                <td><input type="text" class="form-control" style="height:26px; font-size:12px; width:40px; max-width:none" value="0"></td>
                <td><input type="text" class="form-control" style="height:26px; font-size:12px; width:80px; max-width:none" placeholder="请输入"></td>
                <td>
                  <select class="form-control form-select" style="height:26px; font-size:12px; max-width:none; width:60px">
                    <option selected>月</option>
                    <option>年</option>
                    <option>周</option>
                    <option>日</option>
                  </select>
                </td>
                <td>V1</td>
                <td>
                  <div style="font-size:11px; line-height:1.5;">
                    <span style="color:#333">人员分类等于在岗职工</span><br>
                    <a class="action-link" style="font-size:11px; color:var(--primary-blue)" onclick="openFilterConditionModal()">+ 添加</a>
                  </div>
                </td>
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
                <td><input type="text" class="form-control" style="height:26px; font-size:12px; width:40px; max-width:none" placeholder="请输入"></td>
                <td><input type="text" class="form-control" style="height:26px; font-size:12px; width:80px; max-width:none" placeholder="请输入"></td>
                <td>
                  <select class="form-control form-select" style="height:26px; font-size:12px; max-width:none; width:60px">
                    <option>月</option>
                    <option>年</option>
                    <option>周</option>
                    <option>日</option>
                  </select>
                </td>
                <td>V1</td>
                <td>
                  <div style="font-size:11px; line-height:1.5;">
                    <a class="action-link" style="font-size:11px; color:var(--primary-blue)" onclick="openFilterConditionModal()">+ 添加</a>
                  </div>
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
          <button class="btn btn-primary btn-sm" onclick="loadPage('indicator-mgmt')">保存</button>
        </div>
      </div>
      <div class="edit-page-body" style="padding:20px 24px">
        <!-- 基本配置 -->
        <div class="section-title">基本配置</div>
        <div style="margin:16px 0">
          <button class="btn btn-sm" onclick="openSelectIndicatorModal()">选择衍生指标</button>
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
            <button class="btn btn-sm" onclick="openSelectIndicatorModal('multi')">选择指标</button>
            <button class="btn btn-sm">解绑</button>
          </div>
          <div class="calc-layout">
            <!-- 左侧已选指标列表 -->
            <div class="calc-indicators">
              <div class="calc-ind-item selected">
                <span class="calc-ind-dot" style="background:#f5c542"></span>
                <span>000019(日完成生产订单)</span>
                <i class="fa-regular fa-trash-can calc-ind-del" onclick="confirmDelete('000019(日完成生产订单)')"></i>
              </div>
              <div class="calc-ind-item">
                <span class="calc-ind-dot" style="background:#f5c542"></span>
                <span>000018(生产订单)</span>
                <i class="fa-regular fa-trash-can calc-ind-del" onclick="confirmDelete('000018(生产订单)')"></i>
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
          <button class="btn btn-primary btn-sm" onclick="loadPage('indicator-mgmt')">保存</button>
        </div>
      </div>
      <div class="batch-body">
        <!-- 左侧配置面板 -->
        <div class="batch-config">
          <div class="batch-section">
            <div class="batch-section-header">
              <i class="fa-solid fa-caret-right"></i> 选择原子指标
            </div>
            <div class="batch-section-body" id="batch-atom-list">
              <div class="batch-tag-item">
                <span class="batch-tag-icon" style="background:#3370ff">A</span>
                <div style="flex:1;min-width:0;position:relative;" id="batch-atom-wrap-0">
                  <div style="display:flex;align-items:center;border:1px solid #d9d9d9;border-radius:4px;padding:0 10px;height:32px;background:#fff;cursor:pointer;" onclick="toggleBatchAtomTree(0)">
                    <input type="text" id="batch-atom-input-0" placeholder="请选择指标" readonly value="营收收入" style="flex:1;border:none;outline:none;font-size:13px;background:transparent;cursor:pointer;color:var(--text-primary);">
                    <i class="fa-solid fa-magnifying-glass" style="color:#c9cdd4;font-size:12px;"></i>
                  </div>
                </div>
                <i class="fa-solid fa-xmark batch-tag-remove"></i>
              </div>
              <button class="btn btn-sm batch-add-btn" onclick="addBatchAtomRow()"><i class="fa-solid fa-plus"></i> 添加原子指标</button>
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
              <button class="btn btn-sm batch-add-btn" onclick="openBatchModifierModal()"><i class="fa-solid fa-plus"></i> 选择修饰词</button>
            </div>
          </div>

          <div class="batch-section">
            <div class="batch-section-header">
              <i class="fa-solid fa-caret-right"></i> 选择时间周期
            </div>
            <div class="batch-section-body" id="batch-period-list">
              <div class="batch-tag-item">
                <span class="batch-tag-icon" style="background:#3370ff">A</span>
                <select class="form-control form-select" style="flex:1; min-width:0">
                  <option selected>年</option>
                  <option>半年</option>
                  <option>季度</option>
                  <option>月</option>
                  <option>周</option>
                  <option>日</option>
                </select>
                <i class="fa-solid fa-xmark batch-tag-remove" onclick="this.parentElement.remove()"></i>
              </div>
              <button class="btn btn-sm batch-add-btn" onclick="addBatchPeriodRow()"><i class="fa-solid fa-plus"></i> 添加时间周期</button>
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
               <a class="action-link" style="color:#f53f3f" onclick="confirmDelete('${r.version}')">删除</a>`;
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

// ============ 选择指标弹窗 ============
function openSelectIndicatorModal(mode) {
  var existing = document.getElementById('select-indicator-overlay');
  if (existing) existing.remove();

  var isMulti = (mode === 'multi');
  var indicators = isMulti ? [
    { code:'CRH000_ID_01003...', name:'在岗职工人数', desc:'', checked:true },
    { code:'CRH000_ID_01003...', name:'职工人数', desc:'', checked:true },
    { code:'000020', name:'创建生产订单', desc:'' },
    { code:'000019', name:'日完成生产订单', desc:'' },
    { code:'000018', name:'生产订单', desc:'' },
    { code:'000017', name:'营收收入', desc:'营收收入' },
    { code:'000012', name:'关闭生产订单数量', desc:'' },
    { code:'000013', name:'取消生产订单数量', desc:'' },
    { code:'000010', name:'周完成生产订单总数', desc:'' },
    { code:'000011', name:'日完成生产订单总数', desc:'' },
    { code:'000009', name:'生产订单总数', desc:'' },
    { code:'000004', name:'日完成生产订单数量', desc:'' },
  ] : [
    { code:'000018', name:'生产订单', desc:'' },
    { code:'000017', name:'营收收入', desc:'营收收入' },
    { code:'000009', name:'生产订单总数', desc:'' },
    { code:'000002', name:'生产订单数量', desc:'' },
  ];

  var rows = indicators.map(function(r) {
    var sel = isMulti ? '<input type="checkbox"' + (r.checked ? ' checked' : '') + '>' : '<input type="radio" name="select-ind-radio">';
    return '<tr><td style="width:36px; text-align:center;">' + sel + '</td><td>' + r.code + '</td><td>' + r.name + '</td><td>' + r.desc + '</td></tr>';
  }).join('');

  var treeExtra = isMulti ? '' :
    '<div style="cursor:pointer; padding:4px 8px 4px 28px; font-size:13px; color:#333; display:flex; align-items:center; gap:6px; margin-bottom:2px;">' +
      '<i class="fa-solid fa-chevron-down" style="font-size:10px; color:#999; width:10px;"></i>' +
      '<i class="fa-solid fa-folder" style="color:#f5a623; font-size:12px;"></i> 员工关系</div>' +
    '<div style="cursor:pointer; padding:4px 8px 4px 50px; font-size:13px; color:#333; display:flex; align-items:center; gap:6px; margin-bottom:2px;">' +
      '<i class="fa-solid fa-folder" style="color:#f5a623; font-size:12px;"></i> 人员规模</div>';

  var topBar = isMulti ?
    '<div style="display:flex; align-items:center; justify-content:space-between; padding:10px 16px; border-bottom:1px solid #f0f0f0; flex-shrink:0;">' +
      '<div style="display:flex; align-items:center; gap:6px;"><i class="fa-solid fa-list" style="color:#999; font-size:13px;"></i><span style="font-size:13px; color:#333;">指标管理分类</span></div>' +
      '<div style="display:flex; align-items:center; gap:8px;"><input type="text" class="form-control" placeholder="名称或编码" style="width:180px; height:30px;"><button class="btn btn-primary btn-sm">查 询</button></div>' +
    '</div>' : '';

  var searchBar = isMulti ? '' :
    '<div style="display:flex; align-items:center; gap:8px; margin-bottom:12px; flex-shrink:0;">' +
      '<input type="text" class="form-control" placeholder="名称或编码" style="flex:1; height:32px;">' +
      '<button class="btn btn-primary btn-sm">查 询</button>' +
    '</div>';

  var html =
    '<div class="modal" style="width:820px; max-width:90vw; height:600px; display:flex; flex-direction:column;">' +
      '<div class="modal-header">' +
        '<span class="modal-title">选择指标</span>' +
        '<div class="modal-close" onclick="closeSelectIndicatorModal()"><i class="fa-solid fa-xmark"></i></div>' +
      '</div>' +
      '<div style="flex:1; display:flex; flex-direction:column; overflow:hidden;">' +
        topBar +
        '<div style="flex:1; display:flex; overflow:hidden;">' +
          '<div style="width:200px; min-width:200px; border-right:1px solid #e8e8e8; overflow-y:auto; padding:12px;">' +
            '<div style="cursor:pointer; padding:4px 8px; color:#1890ff; font-size:13px; display:flex; align-items:center; gap:6px; margin-bottom:2px; background:#e8f7ff; border-radius:4px;"><i class="fa-solid fa-folder" style="color:#f5a623; font-size:12px;"></i> 全部</div>' +
            '<div style="cursor:pointer; padding:4px 8px 4px 20px; font-size:13px; color:#333; display:flex; align-items:center; gap:6px; margin-bottom:2px;"><i class="fa-solid fa-folder" style="color:#f5a623; font-size:12px;"></i> 财务数据指标</div>' +
            '<div style="cursor:pointer; padding:4px 8px 4px 12px; font-size:13px; color:#333; display:flex; align-items:center; gap:6px; margin-bottom:2px;"><i class="fa-solid fa-chevron-right" style="font-size:10px; color:#999; width:10px;"></i><i class="fa-solid fa-folder" style="color:#f5a623; font-size:12px;"></i> 指标体系</div>' +
            '<div style="cursor:pointer; padding:4px 8px 4px 12px; font-size:13px; color:#333; display:flex; align-items:center; gap:6px; margin-bottom:2px;"><i class="fa-solid fa-chevron-right" style="font-size:10px; color:#999; width:10px;"></i><i class="fa-solid fa-folder" style="color:#f5a623; font-size:12px;"></i> 华润集团</div>' +
            '<div style="cursor:pointer; padding:4px 8px 4px 12px; font-size:13px; color:#333; display:flex; align-items:center; gap:6px; margin-bottom:2px;"><i class="fa-solid fa-chevron-right" style="font-size:10px; color:#999; width:10px;"></i><i class="fa-solid fa-folder" style="color:#f5a623; font-size:12px;"></i> 人力资源</div>' +
            treeExtra +
          '</div>' +
          '<div style="flex:1; display:flex; flex-direction:column; overflow:hidden; padding:12px 16px;">' +
            searchBar +
            '<div style="flex:1; overflow-y:auto;">' +
              '<table class="data-table"><thead><tr><th style="width:36px;"></th><th>指标编码</th><th>指标名称</th><th>描述</th></tr></thead><tbody>' + rows + '</tbody></table>' +
            '</div>' +
            '<div class="pagination" style="padding:8px 0; flex-shrink:0;">' +
              '<span class="page-info">总共 ' + indicators.length + ' 条数据</span>' +
              '<div class="page-btn"><i class="fa-solid fa-chevron-left"></i></div>' +
              '<div class="page-btn active">1</div>' +
              '<div class="page-btn"><i class="fa-solid fa-chevron-right"></i></div>' +
              '<span class="page-info" style="margin-left:8px;">10 条/页</span>' +
            '</div>' +
          '</div>' +
        '</div>' +
      '</div>' +
      '<div class="modal-footer" style="display:flex; justify-content:flex-end; gap:8px; padding:12px 16px; border-top:1px solid #e8e8e8;">' +
        '<button class="btn btn-sm" onclick="closeSelectIndicatorModal()">取 消</button>' +
        '<button class="btn btn-primary btn-sm" onclick="closeSelectIndicatorModal()">确 定</button>' +
      '</div>' +
    '</div>';

  var overlay = document.createElement('div');
  overlay.id = 'select-indicator-overlay';
  overlay.className = 'modal-overlay';
  overlay.innerHTML = html;
  document.body.appendChild(overlay);
}

function closeSelectIndicatorModal() {
  var el = document.getElementById('select-indicator-overlay');
  if (el) el.remove();
}

// ============ 导入弹窗 ============
function openImportModal() {
  var overlay = document.createElement('div');
  overlay.id = 'import-overlay';
  overlay.style.cssText = 'position:fixed;top:0;left:0;width:100%;height:100%;background:rgba(0,0,0,.45);z-index:2000;display:flex;align-items:center;justify-content:center';
  overlay.innerHTML =
    '<div style="background:#fff;border-radius:8px;width:640px;max-height:90vh;display:flex;flex-direction:column;box-shadow:0 8px 24px rgba(0,0,0,.15)">' +
      '<div style="display:flex;align-items:center;justify-content:space-between;padding:16px 24px;border-bottom:1px solid #e5e6eb">' +
        '<span style="font-size:16px;font-weight:600;color:#1d2129">导入</span>' +
        '<i class="fa-solid fa-xmark" style="cursor:pointer;color:#86909c;font-size:16px" onclick="closeImportModal()"></i>' +
      '</div>' +
      '<div style="flex:1;padding:24px;overflow-y:auto">' +
        '<div style="margin-bottom:20px">' +
          '<span style="font-size:14px;color:#1d2129;font-weight:500">下载导入模板</span>' +
          '<span style="font-size:13px;color:#86909c;margin-left:8px">根据提示信息完善表格内容</span>' +
        '</div>' +
        '<div style="border:1px dashed #c9cdd4;border-radius:6px;padding:12px 0;text-align:center;margin-bottom:24px;cursor:pointer" ' +
            'onmouseover="this.style.borderColor=\'#3370ff\'" onmouseout="this.style.borderColor=\'#c9cdd4\'">' +
          '<i class="fa-solid fa-download" style="color:#3370ff;margin-right:6px"></i>' +
          '<span style="color:#3370ff;font-size:14px">下载表格模板</span>' +
        '</div>' +
        '<div style="display:flex;align-items:center;justify-content:space-between;margin-bottom:12px">' +
          '<span style="font-size:14px;color:#1d2129;font-weight:500">上传完善后的表格</span>' +
          '<span style="font-size:13px;color:#3370ff;cursor:pointer"><i class="fa-regular fa-clock" style="margin-right:4px"></i>导入历史</span>' +
        '</div>' +
        '<div id="import-drop-zone" style="border:1px dashed #c9cdd4;border-radius:6px;padding:48px 0;text-align:center;background:#fafafa;cursor:pointer" ' +
            'onmouseover="this.style.borderColor=\'#3370ff\';this.style.background=\'#f2f7ff\'" ' +
            'onmouseout="this.style.borderColor=\'#c9cdd4\';this.style.background=\'#fafafa\'">' +
          '<div style="margin-bottom:8px"><i class="fa-regular fa-folder-open" style="font-size:36px;color:#3370ff"></i></div>' +
          '<div style="font-size:14px;color:#4e5969">将文件拖到此处或点击上传</div>' +
        '</div>' +
      '</div>' +
      '<div style="display:flex;justify-content:flex-end;gap:8px;padding:12px 24px;border-top:1px solid #e5e6eb">' +
        '<button class="btn btn-sm" onclick="closeImportModal()" style="min-width:64px;height:32px">取 消</button>' +
        '<button class="btn btn-primary btn-sm" style="min-width:64px;height:32px">确 定</button>' +
      '</div>' +
    '</div>';
  document.body.appendChild(overlay);
  overlay.querySelector('#import-overlay > div').addEventListener('click', function(e) { e.stopPropagation(); });
  overlay.addEventListener('click', function() { closeImportModal(); });
}

function closeImportModal() {
  var el = document.getElementById('import-overlay');
  if (el) el.remove();
}

// ============ 所属分类目录树 ============
function toggleCategoryTree(trigger) {
  var dd = document.getElementById('cat-tree-dropdown');
  if (!dd) return;
  if (dd.style.display === 'none') {
    dd.style.display = 'block';
    setTimeout(function() {
      document.addEventListener('click', _closeCatTreeOnClick);
    }, 0);
  } else {
    dd.style.display = 'none';
    document.removeEventListener('click', _closeCatTreeOnClick);
  }
}

function _closeCatTreeOnClick(e) {
  var dd = document.getElementById('cat-tree-dropdown');
  if (!dd) return;
  if (!dd.contains(e.target) && !dd.previousElementSibling && true) {
    var wrapper = dd.parentElement;
    if (wrapper && !wrapper.contains(e.target)) {
      dd.style.display = 'none';
      document.removeEventListener('click', _closeCatTreeOnClick);
    }
  }
}

function selectCatTreeNode(el, name) {
  event.stopPropagation();
  var label = document.getElementById('cat-tree-selected');
  if (label) {
    label.textContent = name;
    label.style.color = '#333';
  }
  var dd = document.getElementById('cat-tree-dropdown');
  if (dd) {
    dd.querySelectorAll('.cat-tree-node').forEach(function(n) { n.style.background = ''; });
    el.style.background = '#e6f7ff';
    dd.style.display = 'none';
  }
  document.removeEventListener('click', _closeCatTreeOnClick);
}

function toggleBindingTree(trigger) {
  var dd = document.getElementById('binding-tree-dropdown');
  if (!dd) return;
  if (dd.style.display === 'none') {
    dd.style.display = 'block';
    setTimeout(function() {
      document.addEventListener('click', _closeBindingTreeOnClick);
    }, 0);
  } else {
    dd.style.display = 'none';
    document.removeEventListener('click', _closeBindingTreeOnClick);
  }
}

function _closeBindingTreeOnClick(e) {
  var dd = document.getElementById('binding-tree-dropdown');
  if (!dd) return;
  var wrapper = dd.parentElement;
  if (wrapper && !wrapper.contains(e.target)) {
    dd.style.display = 'none';
    document.removeEventListener('click', _closeBindingTreeOnClick);
  }
}

function selectBindingTreeNode(el, name) {
  var label = document.getElementById('binding-tree-selected');
  if (label) {
    label.textContent = name;
    label.style.color = '#333';
  }
  var dd = document.getElementById('binding-tree-dropdown');
  if (dd) {
    dd.querySelectorAll('div').forEach(function(n) {
      if (n.style.background === 'rgb(24, 144, 255)') {
        n.style.background = '';
        n.style.color = '#333';
        n.style.borderRadius = '';
      }
    });
    el.style.background = '#1890ff';
    el.style.color = '#fff';
    el.style.borderRadius = '3px';
    dd.style.display = 'none';
  }
  document.removeEventListener('click', _closeBindingTreeOnClick);
}

// ============ 过滤条件弹窗 ============
function openFilterConditionModal() {
  var overlay = document.createElement('div');
  overlay.id = 'filter-cond-overlay';
  overlay.style.cssText = 'position:fixed;top:0;left:0;right:0;bottom:0;background:rgba(0,0,0,.45);z-index:9000;display:flex;align-items:center;justify-content:center;';

  var w = 580;
  overlay.innerHTML =
    '<div style="background:#fff;border-radius:8px;width:'+w+'px;max-height:80vh;display:flex;flex-direction:column;box-shadow:0 8px 30px rgba(0,0,0,.18);">' +
      '<div style="padding:16px 20px;font-size:15px;font-weight:600;color:#333;border-bottom:1px solid #f0f0f0;">过滤条件</div>' +
      '<div style="padding:20px;flex:1;overflow-y:auto;">' +
        '<div style="display:flex;justify-content:center;margin-bottom:20px;">' +
          '<div id="fc-tabs" style="display:inline-flex;border:1px solid #1890ff;border-radius:4px;overflow:hidden;">' +
            '<div class="fc-tab fc-tab-active" onclick="switchFilterTab(\'visual\')" style="padding:6px 24px;font-size:13px;cursor:pointer;background:#1890ff;color:#fff;transition:all .2s;" data-tab="visual">可视化</div>' +
            '<div class="fc-tab" onclick="switchFilterTab(\'sql\')" style="padding:6px 24px;font-size:13px;cursor:pointer;background:#fff;color:#1890ff;transition:all .2s;" data-tab="sql">sql语句</div>' +
          '</div>' +
        '</div>' +
        '<div id="fc-panel-visual">' +
          _buildVisualPanel() +
        '</div>' +
        '<div id="fc-panel-sql" style="display:none;">' +
          _buildSqlPanel() +
        '</div>' +
      '</div>' +
      '<div style="padding:14px 20px;border-top:1px solid #f0f0f0;display:flex;justify-content:flex-end;gap:10px;">' +
        '<button class="btn btn-primary btn-sm" style="padding:6px 28px;" onclick="closeFilterConditionModal()">保 存</button>' +
        '<button class="btn btn-sm" style="padding:6px 28px;" onclick="closeFilterConditionModal()">取 消</button>' +
      '</div>' +
    '</div>';

  document.body.appendChild(overlay);
  overlay.addEventListener('click', function(e) { if (e.target === overlay) closeFilterConditionModal(); });
}

function closeFilterConditionModal() {
  var o = document.getElementById('filter-cond-overlay');
  if (o) o.remove();
}

function switchFilterTab(tab) {
  var vp = document.getElementById('fc-panel-visual');
  var sp = document.getElementById('fc-panel-sql');
  var tabs = document.querySelectorAll('#fc-tabs .fc-tab');
  tabs.forEach(function(t) {
    if (t.dataset.tab === tab) {
      t.style.background = '#1890ff';
      t.style.color = '#fff';
    } else {
      t.style.background = '#fff';
      t.style.color = '#1890ff';
    }
  });
  if (tab === 'visual') {
    vp.style.display = 'block';
    sp.style.display = 'none';
  } else {
    vp.style.display = 'none';
    sp.style.display = 'block';
  }
}

function _buildVisualPanel() {
  return '<div>' +
    '<select style="width:100%;height:36px;border:1px solid #d9d9d9;border-radius:4px;padding:0 10px;font-size:13px;outline:none;box-sizing:border-box;background:#fff;appearance:auto;margin-bottom:14px;color:#333;">' +
      '<option>user_type</option><option>user_name</option><option>user_id</option><option>last_login</option><option>create_time</option>' +
    '</select>' +
    '<select style="width:100%;height:36px;border:1px solid #d9d9d9;border-radius:4px;padding:0 10px;font-size:13px;outline:none;box-sizing:border-box;background:#fff;appearance:auto;margin-bottom:14px;color:#333;">' +
      '<option>等于</option><option>不等于</option><option>大于</option><option>小于</option><option>大于等于</option><option>小于等于</option><option>包含</option><option>不包含</option><option>为空</option><option>不为空</option>' +
    '</select>' +
    '<input type="text" placeholder="请输入值, 长度不超过50" maxlength="50" style="width:100%;height:36px;border:1px solid #1890ff;border-radius:4px;padding:0 10px;font-size:13px;outline:none;box-sizing:border-box;color:#999;">' +
  '</div>';
}

function _buildSqlPanel() {
  var fields = ['last_login','user_type','user_name','user_id','create_time'];
  var fieldListHtml = fields.map(function(f, i) {
    var bg = i === 0 ? 'background:#1890ff;color:#fff;border-radius:4px;' : '';
    return '<div class="fc-sql-field" style="padding:6px 10px;cursor:pointer;font-size:12px;display:flex;align-items:center;gap:6px;'+bg+'" onclick="selectFcSqlField(this,\''+f+'\')">' +
      '<span style="width:8px;height:8px;border-radius:50%;background:#faad14;flex-shrink:0;"></span>' +
      '<span>'+f+'</span></div>';
  }).join('');

  return '<div style="display:flex;gap:0;border:1px solid #e8e8e8;border-radius:4px;overflow:hidden;height:260px;">' +
    '<div style="width:180px;border-right:1px solid #e8e8e8;display:flex;flex-direction:column;flex-shrink:0;">' +
      '<div style="padding:8px;border-bottom:1px solid #f0f0f0;">' +
        '<div style="display:flex;align-items:center;gap:4px;border:1px solid #d9d9d9;border-radius:4px;padding:0 8px;height:28px;">' +
          '<i class="fa-solid fa-magnifying-glass" style="color:#bbb;font-size:11px;"></i>' +
          '<input type="text" placeholder="请输入字段名" style="border:none;outline:none;font-size:12px;flex:1;width:100%;color:#999;">' +
        '</div>' +
      '</div>' +
      '<div style="flex:1;overflow-y:auto;">' + fieldListHtml + '</div>' +
    '</div>' +
    '<div style="flex:1;background:#1e1e2e;color:#d4d4d4;font-family:Consolas,\'Courier New\',monospace;font-size:13px;padding:12px;position:relative;overflow:auto;">' +
      '<div style="display:flex;">' +
        '<span style="color:#6c7086;user-select:none;width:30px;text-align:right;padding-right:10px;flex-shrink:0;">1</span>' +
        '<span id="fc-sql-editor" style="white-space:pre;color:#cdd6f4;">last_login =</span>' +
      '</div>' +
    '</div>' +
  '</div>';
}

function selectFcSqlField(el, fieldName) {
  var items = el.parentElement.querySelectorAll('.fc-sql-field');
  items.forEach(function(it) { it.style.background = ''; it.style.color = '#333'; it.style.borderRadius = ''; });
  el.style.background = '#1890ff';
  el.style.color = '#fff';
  el.style.borderRadius = '4px';
  var editor = document.getElementById('fc-sql-editor');
  if (editor) editor.textContent = fieldName + ' =';
}

// ============ 指标详情页面 ============
function openIndicatorDetail(name, code, type, category) {
  var contentArea = document.getElementById('content-area');

  var basicHtml = _buildIndicatorBasicInfo(name, code, type, category);
  var techHtml = _buildIndicatorTechInfo(name, code, type);

  contentArea.innerHTML =
    '<div class="edit-page">' +
      '<div class="edit-page-header">' +
        '<span class="edit-page-title">指标详情 - ' + name + '</span>' +
        '<div class="edit-page-actions">' +
          '<button class="btn btn-sm" onclick="loadPage(\'indicator-mgmt\')">返回</button>' +
        '</div>' +
      '</div>' +
      '<div style="border-bottom:1px solid #e8e8e8;display:flex;gap:0;padding:0 20px;background:#fff;">' +
        '<div class="indicator-detail-tab active" onclick="switchIndicatorDetailTab(this,\'basic\')" style="padding:10px 20px;font-size:14px;cursor:pointer;border-bottom:2px solid #1890ff;color:#1890ff;font-weight:500;">基本信息</div>' +
        '<div class="indicator-detail-tab" onclick="switchIndicatorDetailTab(this,\'tech\')" style="padding:10px 20px;font-size:14px;cursor:pointer;border-bottom:2px solid transparent;color:#666;">技术信息</div>' +
      '</div>' +
      '<div id="indicator-detail-content" style="flex:1;overflow-y:auto;">' +
        '<div id="indicator-detail-basic" style="padding:20px 24px;">' + basicHtml + '</div>' +
        '<div id="indicator-detail-tech" style="padding:20px 24px;display:none;">' + techHtml + '</div>' +
      '</div>' +
    '</div>';
}

function switchIndicatorDetailTab(el, tab) {
  var tabs = el.parentElement.querySelectorAll('.indicator-detail-tab');
  tabs.forEach(function(t) {
    t.style.borderBottomColor = 'transparent';
    t.style.color = '#666';
    t.style.fontWeight = '400';
  });
  el.style.borderBottomColor = '#1890ff';
  el.style.color = '#1890ff';
  el.style.fontWeight = '500';

  var basicPanel = document.getElementById('indicator-detail-basic');
  var techPanel = document.getElementById('indicator-detail-tech');
  if (tab === 'basic') {
    basicPanel.style.display = '';
    techPanel.style.display = 'none';
  } else {
    basicPanel.style.display = 'none';
    techPanel.style.display = '';
  }
}

function _buildDetailRow(label, value, required) {
  var req = required ? '<span style="color:#ff4d4f;margin-right:2px;">*</span>' : '';
  return '<div style="display:flex;padding:10px 0;border-bottom:1px solid #f5f5f5;min-height:36px;align-items:flex-start;">' +
    '<div style="width:160px;flex-shrink:0;font-size:13px;color:#999;text-align:right;padding-right:16px;line-height:22px;">' + req + label + '</div>' +
    '<div style="flex:1;font-size:13px;color:#333;line-height:22px;word-break:break-all;">' + (value || '—') + '</div>' +
  '</div>';
}

function _buildDetailGroupHeader(title) {
  return '<div style="display:flex;align-items:center;gap:8px;padding:14px 0 8px 0;margin-top:4px;">' +
    '<i class="fa-solid fa-layer-group" style="color:#1890ff;font-size:13px;"></i>' +
    '<span style="font-size:14px;font-weight:600;color:#333;">' + title + '</span>' +
  '</div>';
}

function _buildIndicatorBasicInfo(name, code, type, category) {
  var html = '';

  html += _buildDetailRow('序号', '1', true);

  html += _buildDetailGroupHeader('分类属性');
  html += _buildDetailRow('所属分类', category || '人力资源/员工关系/人员规模', true);
  html += _buildDetailRow('一级数据分类编码', 'RLZY', true);
  html += _buildDetailRow('一级数据分类名称', '人力资源', true);
  html += _buildDetailRow('二级数据分类编码', 'RLZY_YGGX', true);
  html += _buildDetailRow('二级数据分类名称', '员工关系', true);
  html += _buildDetailRow('三级数据分类编码', 'RLZY_YGGX_RYGM', true);
  html += _buildDetailRow('三级数据分类名称', '人员规模', true);

  html += _buildDetailGroupHeader('业务属性');
  html += _buildDetailRow('指标编码', code || 'CRH000_ID_010003_000033', true);
  html += _buildDetailRow('指标名称', name || '在岗职工人数占职工总人数比例', true);
  html += _buildDetailRow('指标定义', '统计在岗职工人数占企业职工总人数的百分比，反映企业在岗人员的占比情况', true);
  html += _buildDetailRow('指标口径', '在岗职工人数 / 职工总人数 × 100%，其中在岗职工不含离退休、待岗人员');
  html += _buildDetailRow('计算公式', '在岗职工人数占比 = 在岗职工人数 / 职工总人数 × 100%');
  html += _buildDetailRow('指标类别', '<span class="badge badge-orange">' + (type || '衍生指标') + '</span>', true);
  html += _buildDetailRow('计量单位', '%', true);

  html += _buildDetailGroupHeader('技术属性');
  html += _buildDetailRow('物理表中文名称', '员工信息宽表');
  html += _buildDetailRow('物理表英文名称', 'ads_ehr_staff_info_wide');
  html += _buildDetailRow('物理字段中文名称', '在岗占比');
  html += _buildDetailRow('物理字段英文名称', 'on_duty_ratio');

  html += _buildDetailGroupHeader('管理属性');
  html += _buildDetailRow('指标定义部门', '人力资源部', true);
  html += _buildDetailRow('指标管理部门', '数据管理中心', true);
  html += _buildDetailRow('数据重要程度', '<span class="badge badge-orange">核心</span>', true);
  html += _buildDetailRow('是否有效', '<span class="badge badge-green">是</span>', true);
  html += _buildDetailRow('填写人', '张三（ZS001）', true);

  html += _buildDetailGroupHeader('系统属性');
  html += _buildDetailRow('维度', '<span class="badge badge-blue" style="margin-right:4px;">组织维度</span><span class="badge badge-blue">时间维度</span>');
  html += _buildDetailRow('时间周期', '月');

  return html;
}

function _buildIndicatorTechInfo(name, code, type) {
  var html = '';

  var infoItems = [
    { label:'指标名称', value: name || '在岗职工人数占职工总人数比例' },
    { label:'指标类型', value: '<span class="badge badge-orange">' + (type || '衍生指标') + '</span>' },
    { label:'关联数据库', value: '<span style="color:#1890ff;">阳江_ClickHouse_测试环境</span> / default / default' },
    { label:'关联表', value: '<code style="background:#f5f5f5;padding:2px 8px;border-radius:4px;font-size:12px;">ads_ehr_staff_info_wide</code>' },
  ];

  html += '<div style="background:#fff;border:1px solid #e8e8e8;border-radius:6px;padding:20px 24px;margin-bottom:20px;">';
  html += '<div style="font-size:14px;font-weight:600;color:#333;margin-bottom:16px;">基本技术信息</div>';
  infoItems.forEach(function(item) {
    html += '<div style="display:flex;padding:8px 0;align-items:center;">' +
      '<div style="width:120px;flex-shrink:0;font-size:13px;color:#999;">' + item.label + '</div>' +
      '<div style="flex:1;font-size:13px;color:#333;">' + item.value + '</div>' +
    '</div>';
  });
  html += '</div>';

  html += '<div style="background:#fff;border:1px solid #e8e8e8;border-radius:6px;padding:20px 24px;margin-bottom:20px;">';
  html += '<div style="font-size:14px;font-weight:600;color:#333;margin-bottom:16px;">计算逻辑</div>';
  html += '<pre style="background:#1e1e1e;color:#d4d4d4;padding:16px 20px;border-radius:6px;font-size:12px;line-height:1.7;overflow-x:auto;margin:0;">' +
    '<span style="color:#569cd6;">SELECT</span>\n' +
    '    org_name                          <span style="color:#569cd6;">AS</span> <span style="color:#9cdcfe;">组织名称</span>,\n' +
    '    period_month                      <span style="color:#569cd6;">AS</span> <span style="color:#9cdcfe;">统计月份</span>,\n' +
    '    on_duty_count                     <span style="color:#569cd6;">AS</span> <span style="color:#9cdcfe;">在岗职工人数</span>,\n' +
    '    total_count                       <span style="color:#569cd6;">AS</span> <span style="color:#9cdcfe;">职工总人数</span>,\n' +
    '    <span style="color:#dcdcaa;">ROUND</span>(on_duty_count / total_count * <span style="color:#b5cea8;">100</span>, <span style="color:#b5cea8;">2</span>)  <span style="color:#569cd6;">AS</span> <span style="color:#9cdcfe;">在岗职工占比</span>\n' +
    '<span style="color:#569cd6;">FROM</span>\n' +
    '    ads_ehr_staff_info_wide\n' +
    '<span style="color:#569cd6;">WHERE</span>\n' +
    '    period_month = <span style="color:#ce9178;">\'2026-02\'</span>\n' +
    '    <span style="color:#569cd6;">AND</span> total_count > <span style="color:#b5cea8;">0</span>\n' +
    '<span style="color:#569cd6;">GROUP BY</span>\n' +
    '    org_name, period_month, on_duty_count, total_count\n' +
    '<span style="color:#569cd6;">ORDER BY</span>\n' +
    '    在岗职工占比 <span style="color:#569cd6;">DESC</span>\n' +
    '<span style="color:#569cd6;">LIMIT</span> <span style="color:#b5cea8;">100</span>;' +
  '</pre>';
  html += '</div>';

  if (type !== '原子指标') {
  html += '<div style="background:#fff;border:1px solid #e8e8e8;border-radius:6px;padding:20px 24px;">';
  html += '<div style="font-size:14px;font-weight:600;color:#333;margin-bottom:16px;">指标关系图</div>';
  html += '<div style="display:flex;align-items:center;justify-content:center;min-height:260px;">';
  html += '<svg width="700" height="240" viewBox="0 0 700 240">';

  html += '<rect x="260" y="85" width="180" height="60" rx="8" fill="#1890ff" stroke="#1890ff" stroke-width="1"/>';
  html += '<text x="350" y="112" text-anchor="middle" fill="#fff" font-size="12" font-weight="600">' + (name || '在岗职工人数占比') + '</text>';
  html += '<text x="350" y="130" text-anchor="middle" fill="rgba(255,255,255,0.7)" font-size="10">' + (type || '衍生指标') + '</text>';

  html += '<rect x="20" y="20" width="150" height="50" rx="6" fill="#fff" stroke="#52c41a" stroke-width="2"/>';
  html += '<text x="95" y="42" text-anchor="middle" fill="#333" font-size="11" font-weight="500">在岗职工人数</text>';
  html += '<text x="95" y="56" text-anchor="middle" fill="#999" font-size="9">派生指标</text>';
  html += '<line x1="170" y1="45" x2="260" y2="105" stroke="#52c41a" stroke-width="1.5" stroke-dasharray="4,3"/>';
  html += '<circle cx="260" cy="105" r="3" fill="#52c41a"/>';

  html += '<rect x="20" y="170" width="150" height="50" rx="6" fill="#fff" stroke="#52c41a" stroke-width="2"/>';
  html += '<text x="95" y="192" text-anchor="middle" fill="#333" font-size="11" font-weight="500">职工总人数</text>';
  html += '<text x="95" y="206" text-anchor="middle" fill="#999" font-size="9">派生指标</text>';
  html += '<line x1="170" y1="195" x2="260" y2="125" stroke="#52c41a" stroke-width="1.5" stroke-dasharray="4,3"/>';
  html += '<circle cx="260" cy="125" r="3" fill="#52c41a"/>';

  html += '<rect x="530" y="20" width="150" height="50" rx="6" fill="#fff" stroke="#ff7d00" stroke-width="2"/>';
  html += '<text x="605" y="42" text-anchor="middle" fill="#333" font-size="11" font-weight="500">人员在岗率看板</text>';
  html += '<text x="605" y="56" text-anchor="middle" fill="#999" font-size="9">下游应用</text>';
  html += '<line x1="440" y1="105" x2="530" y2="45" stroke="#ff7d00" stroke-width="1.5" stroke-dasharray="4,3"/>';
  html += '<circle cx="440" cy="105" r="3" fill="#ff7d00"/>';

  html += '<rect x="530" y="95" width="150" height="50" rx="6" fill="#fff" stroke="#ff7d00" stroke-width="2"/>';
  html += '<text x="605" y="117" text-anchor="middle" fill="#333" font-size="11" font-weight="500">HR月度报表</text>';
  html += '<text x="605" y="131" text-anchor="middle" fill="#999" font-size="9">下游应用</text>';
  html += '<line x1="440" y1="115" x2="530" y2="120" stroke="#ff7d00" stroke-width="1.5" stroke-dasharray="4,3"/>';
  html += '<circle cx="440" cy="115" r="3" fill="#ff7d00"/>';

  html += '<rect x="530" y="170" width="150" height="50" rx="6" fill="#fff" stroke="#ff7d00" stroke-width="2"/>';
  html += '<text x="605" y="192" text-anchor="middle" fill="#333" font-size="11" font-weight="500">组织人效分析</text>';
  html += '<text x="605" y="206" text-anchor="middle" fill="#999" font-size="9">下游应用</text>';
  html += '<line x1="440" y1="125" x2="530" y2="195" stroke="#ff7d00" stroke-width="1.5" stroke-dasharray="4,3"/>';
  html += '<circle cx="440" cy="125" r="3" fill="#ff7d00"/>';

  html += '</svg>';
  html += '</div>';
  html += '<div style="display:flex;gap:20px;justify-content:center;margin-top:8px;font-size:11px;color:#999;">' +
    '<span><span style="display:inline-block;width:10px;height:10px;background:#52c41a;border-radius:2px;margin-right:4px;"></span>上游依赖指标</span>' +
    '<span><span style="display:inline-block;width:10px;height:10px;background:#1890ff;border-radius:2px;margin-right:4px;"></span>当前指标</span>' +
    '<span><span style="display:inline-block;width:10px;height:10px;background:#ff7d00;border-radius:2px;margin-right:4px;"></span>下游应用</span>' +
  '</div>';
  html += '</div>';
  }

  return html;
}

// ============ 批量新增 - 原子指标下拉目录树 ============
var _batchAtomTreeData = [
  { name: '财务数据指标', icon: 'fa-folder', color: '#f90', open: true, children: [
    { name: '营收收入', leaf: true }
  ]},
  { name: '指标体系', icon: 'fa-folder', color: '#f90', open: true, children: [
    { name: '免审', icon: 'fa-folder', color: '#f90', open: true, children: [
      { name: '生产订单数量', leaf: true },
      { name: '生产订单总数', leaf: true }
    ]}
  ]},
  { name: '人力资源', icon: 'fa-folder', color: '#f90', open: true, children: [
    { name: '员工关系', icon: 'fa-folder', color: '#f90', open: true, children: [
      { name: '人员规模', icon: 'fa-folder', color: '#f90', open: false, children: [
        { name: '职工人数', leaf: true },
        { name: '在岗职工人数', leaf: true }
      ]}
    ]}
  ]}
];

var _batchAtomCounter = 1;

function _buildBatchAtomTree(nodes, level) {
  var html = '';
  nodes.forEach(function(n) {
    var indent = (level * 20) + 12;
    if (n.leaf) {
      html += '<div style="padding:6px 12px 6px ' + indent + 'px;font-size:13px;cursor:pointer;white-space:nowrap;" ' +
        'onmouseover="this.style.background=\'#f0f5ff\'" onmouseout="this.style.background=\'transparent\'" ' +
        'onclick="selectBatchAtomNode(this,\'' + n.name + '\')">' +
        '<span style="display:inline-block;width:16px;"></span>' + n.name + '</div>';
    } else {
      var arrow = n.open ? 'fa-caret-down' : 'fa-caret-right';
      html += '<div style="padding:6px 12px 6px ' + indent + 'px;font-size:13px;cursor:default;white-space:nowrap;color:#999;">' +
        '<i class="fa-solid ' + arrow + '" style="width:16px;font-size:11px;color:#c9cdd4;"></i>' +
        '<i class="fa-regular ' + (n.icon||'fa-folder') + '" style="color:' + (n.color||'#f90') + ';margin-right:6px;font-size:13px;"></i>' +
        n.name + '</div>';
      if (n.open && n.children) {
        html += _buildBatchAtomTree(n.children, level + 1);
      }
    }
  });
  return html;
}

function toggleBatchAtomTree(idx) {
  var existingDd = document.getElementById('batch-atom-dd-' + idx);
  if (existingDd) { existingDd.remove(); return; }

  document.querySelectorAll('[id^="batch-atom-dd-"]').forEach(function(el) { el.remove(); });

  var wrap = document.getElementById('batch-atom-wrap-' + idx);
  if (!wrap) return;

  var dd = document.createElement('div');
  dd.id = 'batch-atom-dd-' + idx;
  dd.style.cssText = 'position:absolute;top:100%;left:0;min-width:100%;width:max-content;z-index:300;background:#fff;border:1px solid #d9d9d9;border-radius:4px;box-shadow:0 4px 12px rgba(0,0,0,.12);margin-top:2px;max-height:280px;overflow-y:auto;overflow-x:hidden;';
  dd.setAttribute('data-idx', idx);
  dd.innerHTML = _buildBatchAtomTree(_batchAtomTreeData, 0);
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

function selectBatchAtomNode(el, name) {
  var dd = el.closest('[id^="batch-atom-dd-"]');
  if (!dd) return;
  var idx = dd.getAttribute('data-idx');
  var inp = document.getElementById('batch-atom-input-' + idx);
  if (inp) inp.value = name;
  dd.remove();
}

function addBatchAtomRow() {
  var list = document.getElementById('batch-atom-list');
  if (!list) return;
  var btn = list.querySelector('.batch-add-btn');
  var idx = _batchAtomCounter++;
  var row = document.createElement('div');
  row.className = 'batch-tag-item';
  row.innerHTML =
    '<span class="batch-tag-icon" style="background:#3370ff">A</span>' +
    '<div style="flex:1;min-width:0;position:relative;" id="batch-atom-wrap-' + idx + '">' +
      '<div style="display:flex;align-items:center;border:1px solid #d9d9d9;border-radius:4px;padding:0 10px;height:32px;background:#fff;cursor:pointer;" onclick="toggleBatchAtomTree(' + idx + ')">' +
        '<input type="text" id="batch-atom-input-' + idx + '" placeholder="请选择指标" readonly style="flex:1;border:none;outline:none;font-size:13px;background:transparent;cursor:pointer;color:var(--text-primary);">' +
        '<i class="fa-solid fa-magnifying-glass" style="color:#c9cdd4;font-size:12px;"></i>' +
      '</div>' +
    '</div>' +
    '<i class="fa-solid fa-xmark batch-tag-remove" onclick="this.parentElement.remove()"></i>';
  list.insertBefore(row, btn);
}

// ============ 批量新增 - 添加修饰词弹窗 ============
var _modifierDimTreeData = [
  { name: '君兰维度', icon: 'fa-folder', color: '#f90', open: true, children: [
    { name: '设备维度', leaf: true }
  ]},
  { name: '华润', icon: 'fa-folder', color: '#f90', open: true, children: [
    { name: '指标体系', icon: 'fa-folder', color: '#f90', open: true, children: [
      { name: '人员分类', leaf: true },
      { name: '华润业务分类', leaf: true },
      { name: '订单状态', leaf: true, checked: true }
    ]}
  ]},
  { name: 'test', icon: 'fa-folder', color: '#f90', open: true, children: [
    { name: '客户', leaf: true }
  ]}
];

var _modifierItems = [
  { name: '创建', checked: true },
  { name: '生效', checked: true },
  { name: '完成', checked: true }
];

function openBatchModifierModal() {
  var overlay = document.createElement('div');
  overlay.id = 'batch-modifier-overlay';
  overlay.className = 'modal-overlay';

  var selectedTags = '<span class="batch-mod-dim-tag">订单状态 <i class="fa-solid fa-xmark" style="font-size:10px;margin-left:4px;cursor:pointer;color:#999;" onclick="event.stopPropagation();this.parentElement.remove()"></i></span>';

  var leftTreeHtml = _buildModifierLeftTree();

  var rightChipsHtml = '';
  _modifierItems.forEach(function(m) {
    rightChipsHtml += '<label style="display:inline-flex;align-items:center;gap:4px;padding:4px 12px;border:1px solid #d9d9d9;border-radius:4px;font-size:13px;cursor:pointer;' + (m.checked ? 'border-color:var(--primary-color);color:var(--primary-color);background:#f0f5ff;' : '') + '">' +
      '<input type="checkbox"' + (m.checked ? ' checked' : '') + ' style="accent-color:var(--primary-color);"> ' + m.name + '</label>';
  });

  var modal = document.createElement('div');
  modal.className = 'modal';
  modal.style.cssText = 'width:780px;height:520px;display:flex;flex-direction:column;overflow:hidden;';
  modal.innerHTML =
    '<div class="modal-header">' +
      '<span class="modal-title">添加修饰词</span>' +
      '<span class="modal-close" onclick="closeBatchModifierModal()">&times;</span>' +
    '</div>' +
    '<div style="flex:1;display:flex;flex-direction:column;overflow:hidden;padding:16px 20px 0;">' +
      '<div style="display:flex;align-items:center;gap:12px;margin-bottom:14px;">' +
        '<span style="font-size:13px;color:var(--text-secondary);white-space:nowrap;">选择维度表：</span>' +
        '<div style="position:relative;flex:1;max-width:240px;" id="batch-mod-dim-wrap">' +
          '<div style="display:flex;align-items:center;flex-wrap:wrap;gap:4px;border:1px solid #d9d9d9;border-radius:4px;padding:4px 8px;min-height:32px;background:#fff;cursor:pointer;" onclick="toggleBatchModDimTree()">' +
            '<span id="batch-mod-dim-tags">' + selectedTags + '</span>' +
            '<input type="text" id="batch-mod-dim-input" placeholder="" style="flex:1;min-width:40px;border:none;outline:none;font-size:13px;background:transparent;">' +
            '<i class="fa-regular fa-circle-xmark" style="color:#c9cdd4;font-size:14px;cursor:pointer;flex-shrink:0;" onclick="event.stopPropagation();clearBatchModDimTags()"></i>' +
          '</div>' +
        '</div>' +
        '<button class="btn btn-primary btn-sm" style="white-space:nowrap;padding:5px 16px;">执行预览 <i class="fa-solid fa-chevron-right" style="font-size:10px;margin-left:4px;"></i></button>' +
      '</div>' +
      '<div style="flex:1;display:flex;gap:0;border:1px solid #e8e8e8;border-radius:4px;overflow:hidden;min-height:0;">' +
        '<div id="batch-mod-left-tree" style="width:260px;min-width:260px;border-right:1px solid #e8e8e8;overflow-y:auto;padding:10px 0;">' +
          leftTreeHtml +
        '</div>' +
        '<div style="flex:1;overflow-y:auto;padding:12px 16px;">' +
          '<div style="display:flex;align-items:center;gap:8px;margin-bottom:12px;">' +
            '<label style="display:inline-flex;align-items:center;gap:4px;font-size:13px;cursor:pointer;color:var(--primary-color);">' +
              '<input type="checkbox" checked style="accent-color:var(--primary-color);"> 全选</label>' +
            '<span style="font-size:13px;color:var(--text-tertiary);">' + _modifierItems.length + '个修饰词</span>' +
          '</div>' +
          '<div id="batch-mod-right-chips" style="display:flex;flex-wrap:wrap;gap:8px;">' +
            rightChipsHtml +
          '</div>' +
        '</div>' +
      '</div>' +
      '<div style="display:flex;align-items:center;gap:8px;padding:12px 0;">' +
        '<span style="font-size:13px;color:var(--text-secondary);">修饰词连接符：</span>' +
        '<input type="text" class="form-control" value="&" style="width:160px;">' +
      '</div>' +
    '</div>' +
    '<div style="display:flex;justify-content:flex-end;gap:8px;padding:12px 20px;border-top:1px solid #e8e8e8;">' +
      '<button class="btn btn-sm" onclick="closeBatchModifierModal()">取 消</button>' +
      '<button class="btn btn-primary btn-sm" onclick="closeBatchModifierModal()">确 定</button>' +
    '</div>';

  overlay.appendChild(modal);
  document.body.appendChild(overlay);
}

function closeBatchModifierModal() {
  var el = document.getElementById('batch-modifier-overlay');
  if (el) el.remove();
}

function _buildModifierLeftTree() {
  var html = '';
  var items = [
    { name: '订单状态', checked: true, open: true, children: [
      { name: '创建', checked: true },
      { name: '生效', checked: true },
      { name: '完成', checked: true },
      { name: '关闭', checked: false },
      { name: '取消', checked: false }
    ]}
  ];
  items.forEach(function(cat) {
    html += '<div style="padding:4px 12px;">' +
      '<div style="display:flex;align-items:center;gap:6px;font-size:13px;cursor:pointer;">' +
        '<i class="fa-solid fa-caret-down" style="color:#c9cdd4;font-size:11px;width:14px;"></i>' +
        '<input type="checkbox"' + (cat.checked ? ' checked' : '') + ' style="accent-color:var(--primary-color);">' +
        '<i class="fa-regular fa-folder" style="color:#f90;font-size:13px;"></i>' +
        '<span>' + cat.name + '</span>' +
      '</div>';
    if (cat.children) {
      cat.children.forEach(function(c) {
        html += '<div style="display:flex;align-items:center;gap:6px;padding:4px 0 4px 34px;font-size:13px;">' +
          '<input type="checkbox"' + (c.checked ? ' checked' : '') + ' style="accent-color:var(--primary-color);">' +
          '<span>' + c.name + '</span>' +
        '</div>';
      });
    }
    html += '</div>';
  });
  return html;
}

function toggleBatchModDimTree() {
  var existing = document.getElementById('batch-mod-dim-dropdown');
  if (existing) { existing.remove(); return; }

  var wrap = document.getElementById('batch-mod-dim-wrap');
  if (!wrap) return;

  var dd = document.createElement('div');
  dd.id = 'batch-mod-dim-dropdown';
  dd.style.cssText = 'position:absolute;top:100%;left:0;min-width:100%;width:max-content;z-index:400;background:#fff;border:1px solid #d9d9d9;border-radius:4px;box-shadow:0 4px 12px rgba(0,0,0,.12);margin-top:2px;max-height:260px;overflow-y:auto;overflow-x:hidden;padding:6px 0;';

  function buildTree(nodes, level) {
    var h = '';
    nodes.forEach(function(n) {
      var indent = (level * 20) + 10;
      if (n.leaf) {
        h += '<div style="display:flex;align-items:center;gap:6px;padding:4px 10px 4px ' + indent + 'px;font-size:13px;cursor:pointer;white-space:nowrap;" ' +
          'onmouseover="this.style.background=\'#f0f5ff\'" onmouseout="this.style.background=\'transparent\'" ' +
          'onclick="selectBatchModDim(\'' + n.name + '\')">' +
          '<input type="checkbox"' + (n.checked ? ' checked' : '') + ' style="accent-color:var(--primary-color);pointer-events:none;">' +
          '<span' + (n.checked ? ' style="color:var(--primary-color);font-weight:500;"' : '') + '>' + n.name + '</span>' +
        '</div>';
      } else {
        var arrow = n.open ? 'fa-caret-down' : 'fa-caret-right';
        h += '<div style="display:flex;align-items:center;gap:6px;padding:4px 10px 4px ' + indent + 'px;font-size:13px;cursor:default;white-space:nowrap;color:#999;">' +
          '<i class="fa-solid ' + arrow + '" style="width:14px;font-size:11px;color:#c9cdd4;"></i>' +
          '<input type="checkbox"' + (n.checked ? ' checked' : '') + ' style="accent-color:var(--primary-color);pointer-events:none;">' +
          '<i class="fa-regular fa-folder" style="color:#f90;font-size:13px;"></i>' +
          '<span>' + n.name + '</span>' +
        '</div>';
        if (n.open && n.children) {
          h += buildTree(n.children, level + 1);
        }
      }
    });
    return h;
  }

  dd.innerHTML = buildTree(_modifierDimTreeData, 0);
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

function selectBatchModDim(name) {
  var tagsEl = document.getElementById('batch-mod-dim-tags');
  if (tagsEl) {
    var exists = tagsEl.innerHTML.indexOf(name) !== -1;
    if (!exists) {
      tagsEl.innerHTML += '<span class="batch-mod-dim-tag">' + name +
        ' <i class="fa-solid fa-xmark" style="font-size:10px;margin-left:4px;cursor:pointer;color:#999;" onclick="event.stopPropagation();this.parentElement.remove()"></i></span>';
    }
  }
  var dd = document.getElementById('batch-mod-dim-dropdown');
  if (dd) dd.remove();
}

function clearBatchModDimTags() {
  var tagsEl = document.getElementById('batch-mod-dim-tags');
  if (tagsEl) tagsEl.innerHTML = '';
}

// ============ 批量新增 - 添加时间周期行 ============
function addBatchPeriodRow() {
  var list = document.getElementById('batch-period-list');
  if (!list) return;
  var btn = list.querySelector('.batch-add-btn');
  var row = document.createElement('div');
  row.className = 'batch-tag-item';
  row.innerHTML =
    '<span class="batch-tag-icon" style="background:#3370ff">A</span>' +
    '<select class="form-control form-select" style="flex:1; min-width:0">' +
      '<option>年</option>' +
      '<option>半年</option>' +
      '<option>季度</option>' +
      '<option>月</option>' +
      '<option>周</option>' +
      '<option>日</option>' +
    '</select>' +
    '<i class="fa-solid fa-xmark batch-tag-remove" onclick="this.parentElement.remove()"></i>';
  list.insertBefore(row, btn);
}
