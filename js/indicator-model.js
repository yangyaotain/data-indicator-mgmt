// 指标模型模块
function renderIndicatorModel(container, config) {
  const attrs = [
    { key:'category', label:'所属分类', required:true, type:'select', placeholder:'请选择所属分类', help:'把企业里各种各样的指标，依据其性质、用途等特征进行分门别类' },
    { key:'code', label:'指标编码', required:true, type:'text', placeholder:'请输入', help:'给指标赋予的唯一编码', active:true },
    { key:'name', label:'指标名称', required:true, type:'text', placeholder:'请输入', help:'定义指标所衡量的对象、范围及核心内容' },
    { key:'type', label:'指标类型', required:true, type:'select', placeholder:'请选择', help:'定义指标的属性，属于原子指标、派生指标...' },
    { key:'dimension', label:'维度', required:false, type:'link', linkText:'添加维度', help:'根据指标分析的维度进行定义' },
    { key:'range', label:'数据范围', required:false, type:'range', help:'指标值区间的备注参考' },
    { key:'unit', label:'单位', required:false, type:'text', placeholder:'请输入', help:'是用于衡量指标数值的标准量度，用于明确...' },
    { key:'precision', label:'精度', required:false, type:'text', placeholder:'请输入', help:'指标数值保留的小数位' },
    { key:'desc', label:'描述', required:false, type:'text', placeholder:'请输入', help:'用于对指标信息的补充' },
    { key:'formula', label:'计算公式', required:false, type:'textarea', placeholder:'请输入', help:'用于补充指标的计算方法或公式' },
    { key:'period', label:'时间周期', required:false, type:'select', placeholder:'请选择', help:'用于统计计算指标的时间周期' },
  ];

  const rows = attrs.map(a => {
    let field = '';
    if (a.type === 'text') {
      field = `<input type="text" class="form-control" placeholder="${a.placeholder}" style="flex:1">`;
    } else if (a.type === 'select') {
      field = `<select class="form-control form-select" style="flex:1"><option>${a.placeholder}</option></select>`;
    } else if (a.type === 'textarea') {
      field = `<textarea class="form-control" placeholder="${a.placeholder}" rows="2" style="flex:1"></textarea>`;
    } else if (a.type === 'link') {
      field = `<span><i class="fa-solid fa-circle-plus" style="color:var(--primary-color); margin-right:4px"></i><a class="action-link">${a.linkText}</a></span>`;
    } else if (a.type === 'range') {
      field = `<div style="display:flex; align-items:center; gap:6px; flex:1"><input type="text" class="form-control" placeholder="请输入" style="flex:1"><span style="color:var(--text-tertiary)">—</span><input type="text" class="form-control" placeholder="请输入" style="flex:1"></div>`;
    }
    const req = a.required ? '<span style="color:#f53f3f; margin-right:2px">*</span>' : '';
    const activeCls = a.active ? ' model-attr-row-active' : '';
    return `
      <div class="model-attr-row${activeCls}" onclick="selectModelAttr(this,'${a.key}')">
        <i class="fa-solid fa-grip-vertical" style="color:#c9cdd4; cursor:grab; margin-right:8px"></i>
        <label class="model-attr-label">${req}${a.label}：</label>
        <div class="model-attr-field">${field}</div>
        <span class="model-attr-help"><i class="fa-regular fa-circle-question"></i> ${a.help}</span>
      </div>`;
  }).join('');

  container.innerHTML = `
    <div style="display:flex; height:100%">
      <div class="model-left">
        <div class="model-left-header">
          <span style="font-size:15px; font-weight:600">指标模型</span>
          <button class="btn btn-primary btn-sm"><i class="fa-solid fa-plus" style="margin-right:4px"></i>新增属性</button>
        </div>
        <div class="model-attr-list">${rows}</div>
      </div>
      <div class="model-right">
        <div class="model-right-header">配置</div>
        <div class="model-right-body">
          <div class="model-cfg-group">
            <label class="model-cfg-label required">标题</label>
            <input type="text" class="form-control" value="指标编码">
          </div>
          <div class="model-cfg-group">
            <label class="model-cfg-label required">表单类型</label>
            <input type="text" class="form-control" value="文本框">
          </div>
          <div class="model-cfg-section-title">编码规则配置</div>
          <div class="model-cfg-group">
            <label class="model-cfg-label">连接符</label>
            <input type="text" class="form-control" placeholder="请输入编码连接符">
          </div>
          <div class="model-rule-row">
            <i class="fa-solid fa-grip-vertical" style="color:#c9cdd4; cursor:grab"></i>
            <select class="form-control form-select" style="width:80px; font-size:12px"><option>流水码</option><option>日期码</option></select>
            <span style="font-size:12px; color:var(--text-secondary)">长度:</span>
            <input type="text" class="form-control" value="6" style="width:40px; text-align:center; font-size:12px">
            <span style="font-size:12px; color:var(--text-secondary)">起始值:</span>
            <input type="text" class="form-control" value="1" style="width:40px; text-align:center; font-size:12px">
          </div>
          <div style="margin-bottom:16px">
            <a class="action-link" style="font-size:13px"><i class="fa-solid fa-circle-plus" style="margin-right:4px"></i>添加编码规则</a>
          </div>
          <div class="model-cfg-group">
            <label class="model-cfg-label">编码示例 <i class="fa-solid fa-rotate" style="color:var(--text-tertiary); cursor:pointer; margin-left:4px; font-size:12px"></i></label>
            <input type="text" class="form-control" readonly style="background:#fafafa">
          </div>
          <div class="model-cfg-group">
            <label class="model-cfg-label">模板导入默认值</label>
            <input type="text" class="form-control" placeholder="请输入">
          </div>
          <div class="model-cfg-group">
            <label class="model-cfg-label">提示</label>
            <textarea class="form-control" rows="3" maxlength="200" style="resize:vertical">给指标赋予的唯一编码</textarea>
            <div style="text-align:right; font-size:12px; color:var(--text-tertiary); margin-top:4px">10 / 200</div>
          </div>
          <div style="padding-top:8px">
            <button class="btn btn-primary btn-sm">保存</button>
          </div>
        </div>
      </div>
    </div>`;
}

function selectModelAttr(el, key) {
  el.parentElement.querySelectorAll('.model-attr-row').forEach(r => r.classList.remove('model-attr-row-active'));
  el.classList.add('model-attr-row-active');
}
