// 指标模型模块

var _modelAttrs = [
  { key:'category', label:'所属分类', required:true, type:'select', placeholder:'请选择所属分类', help:'把企业里各种各样的指标，将其按照模型、标准、业务领域等，可以进行多层次的关联' },
  { key:'code', label:'指标编码', required:true, type:'text', placeholder:'请输入', help:'指指标赋予不同于一般的编码' },
  { key:'type', label:'指标类型', required:true, type:'select', placeholder:'请选择', help:'定义指标的种类，属于原子指标、派生指标、衍生指标' },
  { key:'name', label:'指标名称', required:true, type:'text', placeholder:'请输入', help:'定义指标所衡量数据的大类、范围及核心内容' },
  { key:'stdFile', label:'指标标准项英文名称', required:false, type:'text', placeholder:'请输入', help:'根据指标标准级别等级业务分了特类，数据类仅对应的文件，描述' },
  { key:'enAbbr', label:'英文简写', required:true, type:'text', placeholder:'请输入', help:'对与指标英文名义关键简记，（如"生产""需求""金额"，描述）' },
  { key:'webLink', label:'网页链接', required:false, type:'text', placeholder:'请输入', help:'根据指标标准相关对特性以及对义类字段的类别等（如关联门楼号，条说相关）' },
  { key:'stdReport', label:'指标标准项常用名称', required:false, type:'text', placeholder:'请输入', help:'根据指标标准等级等级业务分关联数据层仅对应的文件，描述' },
  { key:'definition', label:'指标定义', required:true, type:'text', placeholder:'请输入', help:'根据指标标准等级在于中条件意义自己的定义，描述' },
  { key:'refStd', label:'参考标准', required:false, type:'text', placeholder:'请输入', help:'根据指标标准等级的定义约内容的参考来源，描述' },
  { key:'source', label:'指标来源', required:true, type:'text', placeholder:'请输入', help:'根据指标标准级别给指标的来源，如公来源的关系，对应大量关于的指标部门时限，描述' },
  { key:'caliber', label:'指标口径', required:false, type:'text', placeholder:'请输入', help:'根据的计算指标标准确定的指标等级的指标基准，包含级别计的按整最指标时限，描述' },
  { key:'formula', label:'计算公式', required:false, type:'textarea', placeholder:'请输入', help:'用于补充指标的计算方法/是通过公式，描述' },
  { key:'level', label:'审级', required:false, type:'text', placeholder:'请输入', help:'是用于衡量数据和数据的标准量度，用于明确确保的计量/计量/以确保' },
  { key:'dimension', label:'维度', required:false, type:'link', linkText:'添加维度', help:'根据指标分析的维度进行定义' },
  { key:'frequency', label:'频度', required:false, type:'text', placeholder:'请输入', help:'指标数据更新提供的数值的频次' },
  { key:'range', label:'数据范围', required:false, type:'range', help:'指标范围区段的标注参考' },
  { key:'precision', label:'精度', required:false, type:'text', placeholder:'请输入', help:'用于对指标信息的其他补充' },
  { key:'period', label:'时间周期', required:false, type:'select', placeholder:'请选择', help:'用于统计计算指标的时间周期' },
];

var _modelAttrConfigs = {
  'category': {
    title:'所属分类', formType:'单选下拉树',
    sections: [
      { type:'relation', label:'关联维度表', value:'华润业务分类' },
      { type:'classification', title:'配置导入模版的所属分类标题', items:[
        { level:'一级分类标题', value:'业务主题' },
        { level:'二级分类标题', value:'业务子主题' },
        { level:'三级分类标题', value:'业务细分类别' },
      ]},
    ],
    defaultLabel:'模板导入默认值', defaultValue:'人员规模',
    hint:'把企业里各种各样的指标，依据其性质、用途、业务领域等，可以分到不同类别里', hintCount:37
  },
  'code': {
    title:'指标编码', formType:'文本框',
    sections: [
      { type:'encodingRule', connector:'_', rules:[
        { ruleType:'分类码', extra:'select', extraLabel:'分类表：', extraValue:'华润业务分类' },
        { ruleType:'流水码', extra:'numbers', lengthVal:'6', startVal:'31' },
      ]},
    ],
    defaultLabel:'模板导入默认值', defaultType:'text', defaultValue:'',
    hint:'给指标赋予的唯一编码', hintCount:10
  },
  'type': {
    title:'指标类型', formType:'单选下拉框',
    sections: [],
    defaultLabel:'模板导入默认值', defaultValue:'',
    hint:'定义指标的属性，属于原子指标、派生指标，还是衍生指标', hintCount:26
  },
  'name': {
    title:'指标名称', formType:'文本框',
    sections: [],
    defaultLabel:'模板导入默认值', defaultType:'text', defaultValue:'',
    hint:'定义指标所衡量的对象、范畴及核心内容', hintCount:18
  },
  'stdFile': {
    title:'指标标准项英文名称', formType:'文本框', formTypeSelect:true,
    sections: [],
    hasRequired:true, requiredOn:false,
    defaultLabel:'模板导入默认值', defaultType:'text', defaultValue:'',
    hint:'描述该指标标准项依据业务习惯、被普遍认可的英文名称，选填', hintCount:28
  },
  'enAbbr': {
    title:'英文简写', formType:'文本输入框',
    sections: [],
    defaultLabel:'模板导入默认值', defaultValue:'',
    hint:'对与指标英文名义关键简记', hintCount:12
  },
  'webLink': {
    title:'网页链接', formType:'文本输入框',
    sections: [],
    defaultLabel:'模板导入默认值', defaultValue:'',
    hint:'根据指标标准相关对特性以及对义类字段的类别', hintCount:22
  },
  'stdReport': {
    title:'指标标准级别报告名称', formType:'文本输入框',
    sections: [],
    defaultLabel:'模板导入默认值', defaultValue:'',
    hint:'根据指标标准等级业务分关联数据层对应的文件名称', hintCount:24
  },
  'definition': {
    title:'指标定义', formType:'多行文本框',
    sections: [],
    defaultLabel:'模板导入默认值', defaultValue:'',
    hint:'根据指标标准等级在于中条件意义自己的定义', hintCount:20
  },
  'refStd': {
    title:'参考标准', formType:'文本输入框',
    sections: [],
    defaultLabel:'模板导入默认值', defaultValue:'',
    hint:'根据指标标准等级的定义约内容的参考来源', hintCount:20
  },
  'source': {
    title:'指标来源', formType:'文本输入框',
    sections: [],
    defaultLabel:'模板导入默认值', defaultValue:'',
    hint:'根据指标标准级别给指标的来源信息', hintCount:16
  },
  'caliber': {
    title:'指标口径', formType:'多行文本框',
    sections: [],
    defaultLabel:'模板导入默认值', defaultValue:'',
    hint:'根据计算指标标准确定的指标等级的指标基准', hintCount:21
  },
  'formula': {
    title:'计算公式', formType:'多行文本框',
    sections: [],
    defaultLabel:'模板导入默认值', defaultValue:'',
    hint:'用于补充指标的计算方法/是通过公式', hintCount:18
  },
  'level': {
    title:'审级', formType:'文本输入框',
    sections: [],
    defaultLabel:'模板导入默认值', defaultValue:'',
    hint:'是用于衡量数据和数据的标准量度', hintCount:15
  },
  'dimension': {
    title:'维度', formType:'多选维度选择',
    sections: [],
    defaultLabel:'模板导入默认值', defaultValue:'',
    hint:'根据指标分析的维度进行定义', hintCount:14
  },
  'frequency': {
    title:'频度', formType:'文本输入框',
    sections: [],
    defaultLabel:'模板导入默认值', defaultValue:'',
    hint:'指标数据更新提供的数值的频次', hintCount:15
  },
  'range': {
    title:'数据范围', formType:'范围输入框',
    sections: [],
    defaultLabel:'模板导入默认值', defaultValue:'',
    hint:'指标范围区段的标注参考', hintCount:12
  },
  'precision': {
    title:'精度', formType:'文本输入框',
    sections: [],
    defaultLabel:'模板导入默认值', defaultValue:'',
    hint:'用于对指标信息的其他补充', hintCount:12
  },
  'period': {
    title:'时间周期', formType:'单选下拉框',
    sections: [],
    defaultLabel:'模板导入默认值', defaultValue:'',
    hint:'用于统计计算指标的时间周期', hintCount:13
  },
};

function _buildConfigPanel(cfg) {
  var html = '';
  // 标题
  html += '<div style="margin-bottom:14px;">';
  html += '<div style="font-size:13px; color:#f53f3f; margin-bottom:6px;">* <span style="color:#333; font-weight:600;">标题</span></div>';
  html += '<input type="text" value="'+cfg.title+'" style="width:100%; height:32px; border:1px solid #d9d9d9; border-radius:4px; padding:0 10px; font-size:13px; outline:none; box-sizing:border-box; color:#999; background:#fafafa;">';
  html += '</div>';
  // 表单类型
  html += '<div style="margin-bottom:14px;">';
  html += '<div style="font-size:13px; color:#f53f3f; margin-bottom:6px;">* <span style="color:#333; font-weight:600;">表单类型</span></div>';
  if (cfg.formTypeSelect) {
    var ftOpts = ['文本框','单选下拉框','多选下拉框','单选下拉树','文本域','数字输入框'];
    var ftHtml = ftOpts.map(function(o){ return '<option'+(o===cfg.formType?' selected':'')+'>'+o+'</option>'; }).join('');
    html += '<select style="width:100%; height:32px; border:1px solid #1890ff; border-radius:4px; padding:0 10px; font-size:13px; outline:none; box-sizing:border-box; background:#fff; appearance:auto;">'+ftHtml+'</select>';
  } else {
    html += '<input type="text" value="'+cfg.formType+'" style="width:100%; height:32px; border:1px solid #d9d9d9; border-radius:4px; padding:0 10px; font-size:13px; outline:none; box-sizing:border-box; color:#999; background:#fafafa;">';
  }
  html += '</div>';

  // 是否必填
  if (cfg.hasRequired !== undefined) {
    var toggleBg = cfg.requiredOn ? '#1890ff' : '#ccc';
    var togglePos = cfg.requiredOn ? '18px' : '2px';
    html += '<div style="margin-bottom:14px;">';
    html += '<div style="font-size:13px; font-weight:600; color:#333; margin-bottom:6px;">是否必填</div>';
    html += '<div style="width:40px; height:22px; border-radius:11px; background:'+toggleBg+'; position:relative; cursor:pointer;">';
    html += '<div style="width:18px; height:18px; border-radius:50%; background:#fff; position:absolute; top:2px; left:'+togglePos+'; box-shadow:0 1px 3px rgba(0,0,0,.2); transition:left .2s;"></div>';
    html += '</div>';
    html += '</div>';
  }

  // 自定义段落
  if (cfg.sections) {
    cfg.sections.forEach(function(sec) {
      if (sec.type === 'relation') {
        html += '<div style="margin-bottom:14px;">';
        html += '<div style="font-size:13px; font-weight:600; color:#333; margin-bottom:6px;">'+sec.label+'</div>';
        html += '<div style="position:relative;"><select style="width:100%; height:32px; border:1px solid #d9d9d9; border-radius:4px; padding:0 10px; font-size:13px; outline:none; box-sizing:border-box; background:#fff; appearance:auto;"><option>'+sec.value+'</option></select></div>';
        html += '</div>';
      } else if (sec.type === 'encodingRule') {
        html += '<div style="background:#f5f7fa; border-radius:6px; padding:12px; margin-bottom:14px;">';
        html += '<div style="font-size:13px; font-weight:600; color:#333; margin-bottom:10px;">编码规则配置</div>';
        html += '<div style="display:flex; align-items:center; gap:8px; margin-bottom:10px;">';
        html += '<span style="font-size:12px; color:#333; flex-shrink:0;">连接符</span>';
        html += '<input type="text" value="'+(sec.connector||'_')+'" style="flex:1; height:30px; border:1px solid #d9d9d9; border-radius:4px; padding:0 8px; font-size:12px; outline:none; box-sizing:border-box; background:#fff;">';
        html += '</div>';
        if (sec.rules) {
          sec.rules.forEach(function(rule) {
            html += '<div style="display:flex; align-items:center; gap:6px; margin-bottom:8px; padding:6px 0; border-top:1px dashed #e0e0e0;">';
            html += '<i class="fa-solid fa-grip-vertical" style="color:#bbb; font-size:11px; cursor:grab;"></i>';
            html += '<select style="height:28px; border:1px solid #d9d9d9; border-radius:4px; padding:0 4px; font-size:11px; outline:none; background:#fff; appearance:auto;"><option>'+rule.ruleType+'</option></select>';
            if (rule.extra === 'select') {
              html += '<span style="font-size:11px; color:#333; flex-shrink:0;">'+rule.extraLabel+'</span>';
              html += '<select style="flex:1; height:28px; border:1px solid #d9d9d9; border-radius:4px; padding:0 4px; font-size:11px; outline:none; background:#fff; color:#999; appearance:auto;"><option>'+rule.extraValue+'</option></select>';
              html += '<i class="fa-solid fa-xmark" style="color:#999; cursor:pointer; font-size:12px;"></i>';
            } else if (rule.extra === 'numbers') {
              html += '<span style="font-size:11px; color:#333; flex-shrink:0;">长度:</span>';
              html += '<input type="text" value="'+rule.lengthVal+'" style="width:40px; height:28px; border:1px solid #d9d9d9; border-radius:4px; padding:0 6px; font-size:11px; outline:none; box-sizing:border-box; text-align:center;">';
              html += '<span style="font-size:11px; color:#333; flex-shrink:0;">起始值:</span>';
              html += '<input type="text" value="'+rule.startVal+'" style="width:40px; height:28px; border:1px solid #d9d9d9; border-radius:4px; padding:0 6px; font-size:11px; outline:none; box-sizing:border-box; text-align:center;">';
            }
            html += '</div>';
          });
        }
        html += '<div style="display:flex; align-items:center; gap:4px; margin-top:6px; cursor:pointer;">';
        html += '<i class="fa-solid fa-circle-plus" style="color:#1890ff; font-size:13px;"></i>';
        html += '<span style="font-size:12px; color:#1890ff;">添加编码规则</span>';
        html += '</div>';
        html += '<div style="display:flex; align-items:center; gap:6px; margin-top:12px;">';
        html += '<span style="font-size:12px; font-weight:500; color:#333;">编码示例</span>';
        html += '<i class="fa-solid fa-rotate" style="color:#1890ff; font-size:12px; cursor:pointer;"></i>';
        html += '</div>';
        html += '<div style="margin-top:6px; height:32px; background:#f0f0f0; border-radius:4px;"></div>';
        html += '</div>';
      } else if (sec.type === 'classification') {
        html += '<div style="background:#f5f7fa; border-radius:6px; padding:10px 12px; margin-bottom:14px;">';
        html += '<div style="display:flex; align-items:center; justify-content:space-between; margin-bottom:12px;">';
        html += '<span style="font-size:13px; font-weight:600; color:#333;">'+sec.title+'</span>';
        html += '<i class="fa-solid fa-circle-plus" style="color:#1890ff; font-size:15px; cursor:pointer;"></i>';
        html += '</div>';
        sec.items.forEach(function(item) {
          html += '<div style="margin-bottom:10px;">';
          html += '<div style="display:flex; align-items:center; justify-content:space-between; margin-bottom:4px;">';
          html += '<span style="font-size:12px; color:#333;">'+item.level+'</span>';
          html += '<i class="fa-regular fa-trash-can" style="font-size:12px; color:#ff4d4f; cursor:pointer;"></i>';
          html += '</div>';
          html += '<input type="text" value="'+item.value+'" style="width:100%; height:30px; border:1px solid #d9d9d9; border-radius:4px; padding:0 10px; font-size:12px; outline:none; box-sizing:border-box; background:#fff;">';
          html += '</div>';
        });
        html += '</div>';
      }
    });
  }

  // 模板导入默认值
  html += '<div style="margin-bottom:14px;">';
  html += '<div style="font-size:13px; font-weight:600; color:#333; margin-bottom:6px;">'+cfg.defaultLabel+'</div>';
  if (cfg.defaultType === 'text') {
    html += '<input type="text" placeholder="请输入" value="'+(cfg.defaultValue||'')+'" style="width:100%; height:32px; border:1px solid #d9d9d9; border-radius:4px; padding:0 10px; font-size:13px; outline:none; box-sizing:border-box; color:'+(cfg.defaultValue?'#333':'#999')+';">';
  } else if (cfg.defaultValue) {
    html += '<div style="position:relative;"><select style="width:100%; height:32px; border:1px solid #d9d9d9; border-radius:4px; padding:0 10px; font-size:13px; outline:none; box-sizing:border-box; background:#fff; appearance:auto;"><option>'+cfg.defaultValue+'</option></select></div>';
  } else {
    html += '<div style="position:relative;"><select style="width:100%; height:32px; border:1px solid #d9d9d9; border-radius:4px; padding:0 10px; font-size:13px; outline:none; box-sizing:border-box; background:#fff; color:#999; appearance:auto;"><option>请选择</option></select></div>';
  }
  html += '</div>';

  // 提示
  html += '<div style="margin-bottom:14px;">';
  html += '<div style="font-size:13px; font-weight:600; color:#333; margin-bottom:6px;">提示</div>';
  html += '<textarea rows="3" maxlength="200" style="width:100%; border:1px solid #d9d9d9; border-radius:4px; padding:8px 10px; font-size:12px; outline:none; resize:vertical; box-sizing:border-box; color:#999; line-height:1.6;">'+cfg.hint+'</textarea>';
  html += '<div style="text-align:right; font-size:11px; color:#999; margin-top:3px;">'+cfg.hintCount+' / 200</div>';
  html += '</div>';

  // 保存
  html += '<div style="padding-top:4px;"><button class="btn btn-primary btn-sm" style="padding:5px 20px;">保 存</button></div>';

  return html;
}

function renderIndicatorModel(container, config) {
  var rows = _modelAttrs.map(function(a, idx) {
    var field = '';
    if (a.type === 'text') {
      field = '<input type="text" placeholder="'+a.placeholder+'" style="flex:1; height:30px; border:1px solid #d9d9d9; border-radius:4px; padding:0 8px; font-size:12px; outline:none; box-sizing:border-box; min-width:0;">';
    } else if (a.type === 'select') {
      field = '<select style="flex:1; height:30px; border:1px solid #d9d9d9; border-radius:4px; padding:0 8px; font-size:12px; outline:none; color:#999; background:#fff; box-sizing:border-box; min-width:0; appearance:auto;"><option>'+a.placeholder+'</option></select>';
    } else if (a.type === 'textarea') {
      field = '<div style="flex:1; position:relative;"><textarea placeholder="'+a.placeholder+'" rows="1" style="width:100%; border:1px solid #d9d9d9; border-radius:4px; padding:4px 24px 4px 8px; font-size:12px; outline:none; resize:none; box-sizing:border-box; min-width:0;"></textarea><i class="fa-solid fa-up-right-and-down-left-from-center" style="position:absolute; right:6px; top:6px; font-size:10px; color:#999; cursor:pointer;"></i></div>';
    } else if (a.type === 'link') {
      field = '<span style="display:inline-flex; align-items:center; gap:4px; font-size:12px; cursor:pointer;"><i class="fa-solid fa-circle-plus" style="color:#1890ff;"></i><a href="#" onclick="event.preventDefault()" style="color:#1890ff; text-decoration:none;">'+a.linkText+'</a></span>';
    } else if (a.type === 'range') {
      field = '<div style="display:flex; align-items:center; gap:6px; flex:1; min-width:0;"><input type="text" placeholder="请输入" style="flex:1; height:30px; border:1px solid #d9d9d9; border-radius:4px; padding:0 8px; font-size:12px; outline:none; box-sizing:border-box; min-width:0;"><span style="color:#999; flex-shrink:0;">—</span><input type="text" placeholder="请输入" style="flex:1; height:30px; border:1px solid #d9d9d9; border-radius:4px; padding:0 8px; font-size:12px; outline:none; box-sizing:border-box; min-width:0;"></div>';
    }
    var req = a.required ? '<span style="color:#f53f3f; margin-right:2px;">*</span>' : '';
    var isFirst = (idx === 0);
    var borderStyle = isFirst ? 'border-left:3px solid #1890ff; background:#fafcff;' : 'border-left:3px solid transparent;';
    var rightIcon = isFirst
      ? '<i class="fa-solid fa-chevron-right" style="color:#1890ff; font-size:12px; flex-shrink:0;"></i>'
      : '<i class="fa-regular fa-trash-can" style="color:#ff4d4f; cursor:pointer; font-size:12px; flex-shrink:0; opacity:0.7;" onclick="event.stopPropagation(); alert(\'删除属性：'+a.label+'\');"></i>';

    return '<div data-attr-key="'+a.key+'" style="display:flex; align-items:center; gap:8px; padding:8px 12px 8px 8px; '+borderStyle+' border-bottom:1px solid #f0f0f0; cursor:pointer; min-height:42px;" onclick="selectModelAttr(this,\''+a.key+'\')">' +
      '<i class="fa-solid fa-grip-vertical" style="color:#d9d9d9; cursor:grab; font-size:11px; flex-shrink:0;"></i>' +
      '<label style="min-width:130px; max-width:160px; font-size:12px; color:#333; white-space:nowrap; text-align:right; flex-shrink:0;">'+req+a.label+'：</label>' +
      '<div style="width:200px; min-width:160px; flex-shrink:0; display:flex; align-items:center;">'+field+'</div>' +
      '<span style="flex:1; font-size:11px; color:#aaa; line-height:1.4; overflow:hidden; display:-webkit-box; -webkit-line-clamp:1; -webkit-box-orient:vertical;"><i class="fa-regular fa-circle" style="font-size:8px; margin-right:4px; vertical-align:middle;"></i>'+a.help+'</span>' +
      rightIcon +
    '</div>';
  }).join('');

  var initCfg = _modelAttrConfigs['category'];

  container.innerHTML =
    '<div style="display:flex; height:100%; background:#fff; overflow:hidden;">' +
      '<div style="flex:1; display:flex; flex-direction:column; overflow:hidden; min-width:0;">' +
        '<div style="display:flex; align-items:center; justify-content:space-between; padding:10px 16px; border-bottom:1px solid #e8e8e8; flex-shrink:0;">' +
          '<span style="font-size:15px; font-weight:600; color:#333;">指标模型</span>' +
          '<button class="btn btn-primary btn-sm"><i class="fa-solid fa-plus" style="margin-right:4px;"></i>新增属性</button>' +
        '</div>' +
        '<div id="model-attr-list" style="flex:1; overflow-y:auto;">' + rows + '</div>' +
      '</div>' +
      '<div style="width:280px; min-width:280px; border-left:1px solid #e8e8e8; display:flex; flex-direction:column; overflow:hidden;">' +
        '<div style="padding:12px 16px; font-size:15px; font-weight:600; color:#333; border-bottom:1px solid #e8e8e8; flex-shrink:0;">配置</div>' +
        '<div id="model-config-panel" style="flex:1; overflow-y:auto; padding:16px;">' + _buildConfigPanel(initCfg) + '</div>' +
      '</div>' +
    '</div>';
}

function selectModelAttr(el, key) {
  var list = document.getElementById('model-attr-list');
  if (!list) return;
  list.querySelectorAll('[data-attr-key]').forEach(function(r) {
    r.style.borderLeft = '3px solid transparent';
    r.style.background = '';
    var icon = r.querySelector('.fa-chevron-right');
    if (icon) {
      icon.className = 'fa-regular fa-trash-can';
      icon.style.color = '#ff4d4f';
      icon.style.opacity = '0.7';
      icon.style.cursor = 'pointer';
    }
  });
  el.style.borderLeft = '3px solid #1890ff';
  el.style.background = '#fafcff';
  var lastIcon = el.querySelector('.fa-trash-can');
  if (lastIcon) {
    lastIcon.className = 'fa-solid fa-chevron-right';
    lastIcon.style.color = '#1890ff';
    lastIcon.style.opacity = '1';
    lastIcon.style.cursor = 'default';
  }

  var cfg = _modelAttrConfigs[key];
  if (cfg) {
    var panel = document.getElementById('model-config-panel');
    if (panel) panel.innerHTML = _buildConfigPanel(cfg);
  }
}
