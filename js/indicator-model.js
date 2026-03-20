// 指标模型模块

var _modelAttrs = [
  { key:'seq', label:'序号', required:true, type:'text', placeholder:'', system:true, help:'自增序号' },
  { key:'category', label:'所属分类', required:true, type:'select', placeholder:'请选择所属分类', system:true, group:'分类属性', help:'把企业里各种各样的指标，依据其性质、用途、业务领域等，可以进行多层次的关联' },
  { key:'catCode1', label:'一级数据分类编码', required:true, type:'text', placeholder:'请输入', group:'分类属性', help:'一级数据分类编码依据数据资产管理平台已有的一级数据分类编码进行填写；如为新增数据分类，需按数据分类名称拼音首字母大写组织相关领域业务代表讨论形成方案，并提交运营中心组织审核并推动发布。' },
  { key:'catName1', label:'一级数据分类名称', required:true, type:'text', placeholder:'请输入', group:'分类属性', help:'一级数据分类依据《集团数据架构管理办法》的【附件七-一级数据资产目录】进行分类，若需新增或变更现有一级数据分类，由关键用户组织相关领域业务代表讨论形成方案，并提交运营中心组织审核并推动发布。' },
  { key:'catCode2', label:'二级数据分类编码', required:true, type:'text', placeholder:'请输入', group:'分类属性', help:'二级数据分类编码依据数据资产管理平台已有的一级数据分类编码进行填写；如为新增数据分类，需按数据分类名称拼音首字母大写填写，不允许使用下划线"_"以外的特殊符号；如非新增分类，应保持与原分类编码一致。' },
  { key:'catName2', label:'二级数据分类名称', required:true, type:'text', placeholder:'请输入', group:'分类属性', help:'二级数据分类依据《集团数据架构管理办法》的【附件七-二级数据资产目录】进行分类，若需新增或变更现有二级数据分类，由关键用户组织相关领域业务代表讨论形成方案，并提交运营中心组织审核并推动发布。' },
  { key:'catCode3', label:'三级数据分类编码', required:true, type:'text', placeholder:'请输入', group:'分类属性', help:'三级数据分类编码依据数据资产管理平台已有的三级数据分类编码进行填写；如为新增数据分类，需按数据分类名称拼音首字母大写填写，不允许使用下划线"_"以外的特殊符号；如非新增分类，应保持与原分类编码一致。' },
  { key:'catName3', label:'三级数据分类名称', required:true, type:'text', placeholder:'请输入', group:'分类属性', help:'三级数据分类基于集团部门或成员公司已有的三级数据分类进行分类，已有的数据分类可通过数据资产管理平台进行查询；若需新增或变更现有三级数据分类，由关键用户组织相关领域业务代表讨论形成方案，并提交运营中心组织审核并推动发布。' },
  { key:'code', label:'指标编码', required:true, type:'text', placeholder:'请输入', system:true, group:'业务属性', help:'根据指标编码规则进行编码' },
  { key:'name', label:'指标名称', required:true, type:'text', placeholder:'请输入', system:true, group:'业务属性', help:'描述指标的业务名称（必填）' },
  { key:'definition', label:'指标定义', required:true, type:'textarea', placeholder:'请输入', group:'业务属性', help:'明确给出指标的业务定义，确保对指标理解的一致性（必填）' },
  { key:'caliber', label:'指标口径', required:false, type:'textarea', placeholder:'请输入', group:'业务属性', help:'描述指标的业务统计口径，包括统计范围口径和统计方式口径' },
  { key:'formula', label:'计算公式', required:false, type:'textarea', placeholder:'请输入', group:'业务属性', help:'指标的计算公式，如A=B/C；衍生指标计算公式必填，基础指标可不填' },
  { key:'type', label:'指标类别', required:true, type:'select', placeholder:'请选择', options:['原子指标','派生指标','衍生指标'], system:true, group:'业务属性', help:'基础指标或衍生指标，下拉选择（必填）' },
  { key:'unit', label:'计量单位', required:true, type:'text', placeholder:'请输入', group:'业务属性', help:'指标的计量单位，如万元（必填）' },
  { key:'physTableCn', label:'物理表中文名称', required:false, type:'text', placeholder:'请输入', group:'技术属性', help:'该数据所在系统的物理表中文名称（表注释），有对应业务系统必填' },
  { key:'physTableEn', label:'物理表英文名称', required:false, type:'text', placeholder:'请输入', group:'技术属性', help:'该数据所在系统的物理表英文名称，有对应业务系统必填' },
  { key:'physFieldCn', label:'物理字段中文名称', required:false, type:'text', placeholder:'请输入', group:'技术属性', help:'该数据对应系统的物理字段中文名称（字段注释），有对应业务系统必填' },
  { key:'physFieldEn', label:'物理字段英文名称', required:false, type:'text', placeholder:'请输入', group:'技术属性', help:'该数据所在系统的物理字段英文名称，有对应业务系统必填' },
  { key:'defDept', label:'指标定义部门', required:true, type:'text', placeholder:'请输入', group:'管理属性', help:'填写对指标名称、含义、口径、计算方式等进行定义的业务部门（必填）' },
  { key:'mgmtDept', label:'指标管理部门', required:true, type:'text', placeholder:'请输入', group:'管理属性', help:'列举此指标资产管理部门（必填）' },
  { key:'importance', label:'数据重要程度', required:true, type:'select', placeholder:'请选择', options:['一般','重要','核心'], group:'管理属性', help:'数据的重要程度，分为一般、重要、核心（必选）' },
  { key:'isValid', label:'是否有效', required:true, type:'select', placeholder:'请选择', options:['是','否'], group:'管理属性', help:'判断该指标资产是否从业务视角进行数据资产管理（必选）' },
  { key:'author', label:'填写人', required:true, type:'text', placeholder:'请输入', group:'管理属性', help:'该表格的填写人工号及姓名' },
  { key:'dimension', label:'维度', required:false, type:'dimension', system:true, group:'系统属性', help:'根据指标分析的维度进行定义' },
  { key:'timePeriod', label:'时间周期', required:false, type:'select', placeholder:'请选择', options:['年','半年','季度','月','周','日'], system:true, group:'系统属性', help:'用于统计计算指标时间周期' },
];

var _modelAttrConfigs = {
  'seq': {
    title:'序号', formType:'文本框', requiredOn:true,
    sections: [],
    defaultType:'text', defaultValue:'',
    hint:'自增序号', hintCount:4
  },
  'category': {
    title:'所属分类', formType:'单选下拉树', requiredOn:true, relationValue:'华润业务分类',
    sections: [
      { type:'classification', title:'配置导入模版的分类属性标题', items:[
        { level:'一级分类标题', value:'一级数据分类名称' },
        { level:'二级分类标题', value:'二级数据分类名称' },
        { level:'三级分类标题', value:'三级数据分类名称' },
      ]},
    ],
    defaultValue:'人员规模',
    hint:'把企业里各种各样的指标，依据其性质、用途、业务领域等，可以分到不同类别里', hintCount:37
  },
  'catCode1': {
    title:'一级数据分类编码', formType:'文本框', requiredOn:true,
    sections: [],
    defaultType:'text', defaultValue:'',
    hint:'依据数据资产管理平台已有的一级数据分类编码进行填写', hintCount:24
  },
  'catName1': {
    title:'一级数据分类名称', formType:'文本框', requiredOn:true,
    sections: [],
    defaultType:'text', defaultValue:'',
    hint:'依据《集团数据架构管理办法》的【附件七-一级数据资产目录】进行分类', hintCount:32
  },
  'catCode2': {
    title:'二级数据分类编码', formType:'文本框', requiredOn:true,
    sections: [],
    defaultType:'text', defaultValue:'',
    hint:'依据数据资产管理平台已有的一级数据分类编码进行填写', hintCount:24
  },
  'catName2': {
    title:'二级数据分类名称', formType:'文本框', requiredOn:true,
    sections: [],
    defaultType:'text', defaultValue:'',
    hint:'依据《集团数据架构管理办法》的【附件七-二级数据资产目录】进行分类', hintCount:32
  },
  'catCode3': {
    title:'三级数据分类编码', formType:'文本框', requiredOn:true,
    sections: [],
    defaultType:'text', defaultValue:'',
    hint:'依据数据资产管理平台已有的三级数据分类编码进行填写', hintCount:24
  },
  'catName3': {
    title:'三级数据分类名称', formType:'文本框', requiredOn:true,
    sections: [],
    defaultType:'text', defaultValue:'',
    hint:'基于集团部门或成员公司已有的三级数据分类进行分类', hintCount:24
  },
  'code': {
    title:'指标编码', formType:'文本框', requiredOn:true,
    sections: [
      { type:'encodingRule', connector:'_', rules:[
        { ruleType:'分类码', extra:'select', extraLabel:'分类表：', extraValue:'华润业务分类' },
        { ruleType:'流水码', extra:'numbers', lengthVal:'6', startVal:'31' },
      ]},
    ],
    defaultType:'text', defaultValue:'',
    hint:'根据指标编码规则进行编码', hintCount:12
  },
  'name': {
    title:'指标名称', formType:'文本框', requiredOn:true,
    sections: [],
    defaultType:'text', defaultValue:'',
    hint:'描述指标的业务名称（必填）', hintCount:13
  },
  'definition': {
    title:'指标定义', formType:'文本域', requiredOn:true,
    sections: [],
    defaultType:'text', defaultValue:'',
    hint:'明确给出指标的业务定义，确保对指标理解的一致性（必填）', hintCount:26
  },
  'caliber': {
    title:'指标口径', formType:'文本域', requiredOn:false,
    sections: [],
    defaultValue:'',
    hint:'描述指标的业务统计口径，包括统计范围口径和统计方式口径', hintCount:50
  },
  'formula': {
    title:'计算公式', formType:'文本域', requiredOn:false,
    sections: [],
    defaultValue:'',
    hint:'指标的计算公式，如A=B/C；衍生指标计算公式必填，基础指标可不填', hintCount:30
  },
  'type': {
    title:'指标类别', formType:'单选下拉框', requiredOn:true, relationValue:'人员分类',
    sections: [],
    defaultValue:'',
    hint:'基础指标或衍生指标，下拉选择（必填）', hintCount:18
  },
  'unit': {
    title:'计量单位', formType:'文本框', requiredOn:true,
    sections: [],
    defaultType:'text', defaultValue:'',
    hint:'指标的计量单位，如万元（必填）', hintCount:14
  },
  'physTableCn': {
    title:'物理表中文名称', formType:'文本框', requiredOn:false,
    sections: [],
    defaultType:'text', defaultValue:'',
    hint:'该数据所在系统的物理表中文名称（表注释），有对应业务系统必填', hintCount:30
  },
  'physTableEn': {
    title:'物理表英文名称', formType:'文本框', requiredOn:false,
    sections: [],
    defaultType:'text', defaultValue:'',
    hint:'该数据所在系统的物理表英文名称，有对应业务系统必填', hintCount:25
  },
  'physFieldCn': {
    title:'物理字段中文名称', formType:'文本框', requiredOn:false,
    sections: [],
    defaultType:'text', defaultValue:'',
    hint:'该数据对应系统的物理字段中文名称（字段注释），有对应业务系统必填', hintCount:32
  },
  'physFieldEn': {
    title:'物理字段英文名称', formType:'文本框', requiredOn:false,
    sections: [],
    defaultType:'text', defaultValue:'',
    hint:'该数据所在系统的物理字段英文名称，有对应业务系统必填', hintCount:27
  },
  'dimension': {
    title:'维度', formType:'维度选择', requiredOn:false, simpleConfig:true,
    sections: [],
    defaultValue:'',
    hint:'根据指标分析的维度进行定义', hintCount:13
  },
  'defDept': {
    title:'指标定义部门', formType:'文本框', requiredOn:true,
    sections: [],
    defaultType:'text', defaultValue:'',
    hint:'填写对指标名称、含义、口径、计算方式等进行定义的业务部门（必填）', hintCount:30
  },
  'mgmtDept': {
    title:'指标管理部门', formType:'文本框', requiredOn:true,
    sections: [],
    defaultType:'text', defaultValue:'',
    hint:'列举此指标资产管理部门（必填）', hintCount:15
  },
  'importance': {
    title:'数据重要程度', formType:'单选下拉框', requiredOn:true, relationValue:'人员分类',
    sections: [],
    defaultValue:'',
    hint:'数据的重要程度，分为一般、重要、核心（必选）', hintCount:22
  },
  'isValid': {
    title:'是否有效', formType:'单选下拉框', requiredOn:true, relationValue:'人员分类',
    sections: [],
    defaultValue:'',
    hint:'判断该指标资产是否从业务视角进行数据资产管理（必选）', hintCount:26
  },
  'author': {
    title:'填写人', formType:'文本框', requiredOn:false,
    sections: [],
    defaultType:'text', defaultValue:'',
    hint:'该表格的填写人工号及姓名', hintCount:13
  },
  'timePeriod': {
    title:'时间周期', formType:'单选下拉框', requiredOn:false, simpleConfig:true,
    sections: [],
    defaultValue:'',
    hint:'用于统计计算指标时间周期', hintCount:12
  },
};

var _currentCfgKey = '';
var _allFormTypes = ['文本框','单选下拉框','多选下拉框','单选下拉树','文本域','数字输入框'];

function _buildConfigPanel(cfg) {
  var html = '';
  // 标题
  html += '<div style="margin-bottom:14px;">';
  html += '<div style="font-size:13px; color:#f53f3f; margin-bottom:6px;">* <span style="color:#333; font-weight:600;">标题</span></div>';
  html += '<input type="text" value="'+cfg.title+'" style="width:100%; height:32px; border:1px solid #d9d9d9; border-radius:4px; padding:0 10px; font-size:13px; outline:none; box-sizing:border-box;">';
  html += '</div>';
  // 表单类型 - 始终显示下拉
  var _curAttr = _modelAttrs.filter(function(a){ return a.key === _currentCfgKey; })[0];
  var _isSystem = _curAttr && _curAttr.system;
  html += '<div style="margin-bottom:14px;">';
  html += '<div style="font-size:13px; color:#f53f3f; margin-bottom:6px;">* <span style="color:#333; font-weight:600;">表单类型</span></div>';
  if (_isSystem) {
    html += '<select id="cfg-form-type-select" disabled style="width:100%; height:32px; border:1px solid #d9d9d9; border-radius:4px; padding:0 10px; font-size:13px; outline:none; box-sizing:border-box; background:#f5f5f5; appearance:auto; color:#999; cursor:not-allowed;"><option selected>'+cfg.formType+'</option></select>';
  } else {
    var ftHtml = _allFormTypes.map(function(o){ return '<option'+(o===cfg.formType?' selected':'')+'>'+o+'</option>'; }).join('');
    html += '<select id="cfg-form-type-select" onchange="switchCfgFormType(this.value)" style="width:100%; height:32px; border:1px solid #1890ff; border-radius:4px; padding:0 10px; font-size:13px; outline:none; box-sizing:border-box; background:#fff; appearance:auto;">'+ftHtml+'</select>';
  }
  html += '</div>';

  if (!cfg.simpleConfig) {
    // 动态区域（根据表单类型变化）
    html += '<div id="cfg-dynamic-section">';
    html += _buildDynamicSection(cfg.formType, cfg);
    html += '</div>';

    // 特殊段落（编码规则、分类配置等，仅特定属性有）
    if (cfg.sections) {
      cfg.sections.forEach(function(sec) {
        if (sec.type === 'encodingRule') {
          html += _buildEncodingRuleSection(sec);
        } else if (sec.type === 'classification') {
          html += _buildClassificationSection(sec);
        }
      });
    }

    // 是否必填
    var toggleBg = cfg.requiredOn ? '#1890ff' : '#ccc';
    var togglePos = cfg.requiredOn ? '18px' : '2px';
    html += '<div style="margin-bottom:14px;">';
    html += '<div style="font-size:13px; font-weight:600; color:#333; margin-bottom:8px;">是否必填</div>';
    html += '<div style="width:40px; height:22px; border-radius:11px; background:'+toggleBg+'; position:relative; cursor:pointer;" onclick="var k=this.querySelector(\'div\'); var on=k.style.left===\'18px\'; k.style.left=on?\'2px\':\'18px\'; this.style.background=on?\'#ccc\':\'#1890ff\';">';
    html += '<div style="width:18px; height:18px; border-radius:50%; background:#fff; position:absolute; top:2px; left:'+togglePos+'; box-shadow:0 1px 3px rgba(0,0,0,.2); transition:left .2s;"></div>';
    html += '</div>';
    html += '</div>';
  }

  // 模板导入默认值
  html += '<div style="margin-bottom:14px;">';
  html += '<div style="font-size:13px; font-weight:600; color:#333; margin-bottom:6px;">模板导入默认值</div>';
  html += '<div id="cfg-default-section">' + _buildDefaultSection(cfg.formType, cfg) + '</div>';
  html += '</div>';

  // 提示
  html += '<div style="margin-bottom:14px;">';
  html += '<div style="font-size:13px; font-weight:600; color:#333; margin-bottom:6px;">提示</div>';
  html += '<textarea rows="3" maxlength="200" style="width:100%; border:1px solid #d9d9d9; border-radius:4px; padding:8px 10px; font-size:12px; outline:none; resize:vertical; box-sizing:border-box; color:#666; line-height:1.6;">'+cfg.hint+'</textarea>';
  html += '<div style="text-align:right; font-size:11px; color:#999; margin-top:3px;">'+cfg.hintCount+' / 200</div>';
  html += '</div>';

  // 保存
  html += '<div style="padding-top:4px;"><button class="btn btn-primary btn-sm" style="padding:5px 20px;">保 存</button></div>';

  return html;
}

function _buildDynamicSection(formType, cfg) {
  var html = '';
  if ((formType === '单选下拉框' || formType === '多选下拉框' || formType === '单选下拉树') && cfg.relationValue) {
    var relValue = cfg.relationValue;
    html += '<div style="background:#f5f7fa; border-radius:6px; padding:12px; margin-bottom:14px;">';
    html += '<div style="font-size:13px; font-weight:600; color:#333; margin-bottom:10px;">自定义数据来源</div>';
    html += '<div style="font-size:13px; color:#f53f3f; margin-bottom:6px;">* <span style="color:#333; font-weight:600;">关联维度表</span></div>';
    if (formType === '单选下拉框') {
      html += '<div style="display:flex; align-items:center; height:32px; border:1px solid #1890ff; border-radius:4px; padding:0 10px; background:#fff; box-sizing:border-box;">';
      html += '<span style="flex:1; font-size:13px; color:#333;">'+relValue+'</span>';
      html += '<i class="fa-solid fa-circle-xmark" style="color:#bbb; font-size:14px; cursor:pointer;"></i>';
      html += '</div>';
    } else {
      html += '<select style="width:100%; height:32px; border:1px solid #1890ff; border-radius:4px; padding:0 10px; font-size:13px; outline:none; box-sizing:border-box; background:#fff; appearance:auto;"><option>'+relValue+'</option></select>';
    }
    html += '</div>';
  }
  return html;
}

function _buildDefaultSection(formType, cfg) {
  if (formType === '文本域') {
    return '<textarea rows="3" placeholder="请输入" style="width:100%; border:1px solid #d9d9d9; border-radius:4px; padding:8px 10px; font-size:13px; outline:none; resize:vertical; box-sizing:border-box; color:#999;">'+(cfg.defaultValue||'')+'</textarea>';
  } else if (formType === '单选下拉框' || formType === '多选下拉框' || formType === '单选下拉树') {
    var val = cfg.defaultValue || '';
    return '<select style="width:100%; height:32px; border:1px solid #d9d9d9; border-radius:4px; padding:0 10px; font-size:13px; outline:none; box-sizing:border-box; background:#fff; color:'+(val?'#333':'#999')+'; appearance:auto;"><option>'+(val||'请选择')+'</option></select>';
  } else {
    return '<input type="text" placeholder="请输入" value="'+(cfg.defaultValue||'')+'" style="width:100%; height:32px; border:1px solid #d9d9d9; border-radius:4px; padding:0 10px; font-size:13px; outline:none; box-sizing:border-box; color:'+(cfg.defaultValue?'#333':'#999')+';">';
  }
}

function switchCfgFormType(newType) {
  var cfg = _modelAttrConfigs[_currentCfgKey] || {};
  var dynEl = document.getElementById('cfg-dynamic-section');
  if (dynEl) dynEl.innerHTML = _buildDynamicSection(newType, cfg);
  var defEl = document.getElementById('cfg-default-section');
  if (defEl) defEl.innerHTML = _buildDefaultSection(newType, cfg);
}

function _buildEncodingRuleSection(sec) {
  var html = '<div style="background:#f5f7fa; border-radius:6px; padding:12px; margin-bottom:14px;">';
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
  return html;
}

function _buildClassificationSection(sec) {
  var html = '<div style="background:#f5f7fa; border-radius:6px; padding:10px 12px; margin-bottom:14px;">';
  html += '<div style="display:flex; align-items:center; justify-content:space-between; margin-bottom:12px;">';
  html += '<span style="font-size:13px; font-weight:600; color:#333;">'+sec.title+'</span>';
  html += '<i class="fa-solid fa-circle-plus" style="color:#1890ff; font-size:15px; cursor:pointer;"></i>';
  html += '</div>';
  sec.items.forEach(function(item) {
    html += '<div style="margin-bottom:10px;">';
    html += '<div style="display:flex; align-items:center; justify-content:space-between; margin-bottom:4px;">';
    html += '<span style="font-size:12px; color:#333;">'+item.level+'</span>';
    html += '<i class="fa-regular fa-trash-can" style="font-size:12px; color:#ff4d4f; cursor:pointer;" onclick="confirmDelete(\''+item.level+'\')"></i>';
    html += '</div>';
    html += '<input type="text" value="'+item.value+'" style="width:100%; height:30px; border:1px solid #d9d9d9; border-radius:4px; padding:0 10px; font-size:12px; outline:none; box-sizing:border-box; background:#fff;">';
    html += '</div>';
  });
  html += '</div>';
  return html;
}

function _buildAttrRow(a, isFirst) {
  var field = '';
  if (a.key === 'category') {
    field = '<div style="flex:1; position:relative;" onclick="event.stopPropagation(); toggleModelCatTree(this);">' +
      '<div style="display:flex; align-items:center; justify-content:space-between; height:30px; border:1px solid #d9d9d9; border-radius:4px; padding:0 8px; font-size:12px; color:#999; background:#fff; box-sizing:border-box; cursor:pointer; min-width:0;">' +
        '<span class="model-cat-label">请选择分类属性</span>' +
        '<i class="fa-solid fa-magnifying-glass" style="color:#bbb; font-size:10px;"></i>' +
      '</div>' +
      '<div class="model-cat-dropdown" style="display:none; position:absolute; top:100%; left:0; right:0; z-index:200; background:#fff; border:1px solid #d9d9d9; border-radius:4px; box-shadow:0 4px 12px rgba(0,0,0,.12); max-height:240px; overflow-y:auto; margin-top:2px; padding:6px 0; min-width:200px;">' +
        _buildModelCatTree() +
      '</div>' +
    '</div>';
  } else if (a.type === 'text') {
    field = '<input type="text" placeholder="'+a.placeholder+'" style="flex:1; height:30px; border:1px solid #d9d9d9; border-radius:4px; padding:0 8px; font-size:12px; outline:none; box-sizing:border-box; min-width:0;">';
  } else if (a.type === 'select') {
    var opts = '<option value="" style="color:#999;">'+a.placeholder+'</option>';
    if (a.options) { a.options.forEach(function(o){ opts += '<option value="'+o+'" style="color:#333;">'+o+'</option>'; }); }
    field = '<select style="flex:1; height:30px; border:1px solid #d9d9d9; border-radius:4px; padding:0 8px; font-size:12px; outline:none; color:#999; background:#fff; box-sizing:border-box; min-width:0; appearance:auto;" onchange="this.style.color=this.value?\'#333\':\'#999\'">'+opts+'</select>';
  } else if (a.type === 'textarea') {
    field = '<div style="flex:1; position:relative;"><textarea placeholder="'+a.placeholder+'" rows="1" style="width:100%; border:1px solid #d9d9d9; border-radius:4px; padding:4px 24px 4px 8px; font-size:12px; outline:none; resize:none; box-sizing:border-box; min-width:0;"></textarea><i class="fa-solid fa-up-right-and-down-left-from-center" style="position:absolute; right:6px; top:6px; font-size:10px; color:#999; cursor:pointer;"></i></div>';
  } else if (a.type === 'dimension') {
    field = '<span style="display:inline-flex; align-items:center; gap:4px; font-size:12px; cursor:pointer; position:relative;" onclick="event.stopPropagation(); toggleDimFilterPanel(this);">' +
      '<i class="fa-solid fa-circle-plus" style="color:#1890ff;"></i>' +
      '<a href="#" onclick="event.preventDefault()" style="color:#1890ff; text-decoration:none;">添加维度</a></span>';
  }
  var req = a.required ? '<span style="color:#f53f3f; margin-right:2px;">*</span>' : '';
  var borderStyle = isFirst ? 'border-left:3px solid #1890ff; background:#fafcff;' : 'border-left:3px solid transparent;';
  var toggleKeys = ['code','name','dimension','timePeriod'];
  var rightIcon;
  if (isFirst) {
    rightIcon = '<i class="fa-solid fa-chevron-right" style="color:#1890ff; font-size:12px; flex-shrink:0;"></i>';
  } else if (toggleKeys.indexOf(a.key) >= 0) {
    rightIcon = '<i class="fa-solid fa-eye attr-toggle-icon" style="color:#1890ff; cursor:pointer; font-size:12px; flex-shrink:0; opacity:0.8;" onclick="event.stopPropagation(); toggleAttrEnabled(this)" title="点击禁用"></i>';
  } else if (a.system) {
    rightIcon = '<span style="width:12px; flex-shrink:0;"></span>';
  } else {
    rightIcon = '<i class="fa-regular fa-trash-can" style="color:#ff4d4f; cursor:pointer; font-size:12px; flex-shrink:0; opacity:0.7;" onclick="event.stopPropagation(); confirmDelete(\''+a.label+'\');"></i>';
  }

  return '<div data-attr-key="'+a.key+'" style="display:flex; align-items:center; gap:8px; padding:8px 12px 8px 8px; '+borderStyle+' border-bottom:1px solid #f0f0f0; cursor:pointer; min-height:42px;" onclick="selectModelAttr(this,\''+a.key+'\')">' +
    '<i class="fa-solid fa-grip-vertical" style="color:#d9d9d9; cursor:grab; font-size:11px; flex-shrink:0;"></i>' +
    '<label style="min-width:140px; max-width:160px; font-size:12px; color:#333; white-space:nowrap; text-align:right; flex-shrink:0;">'+req+a.label+'：</label>' +
    '<div style="width:200px; min-width:160px; flex-shrink:0; display:flex; align-items:center;">'+field+'</div>' +
    '<span style="flex:1; font-size:11px; color:#aaa; line-height:1.4; overflow:hidden; display:-webkit-box; -webkit-line-clamp:1; -webkit-box-orient:vertical;"><i class="fa-regular fa-circle" style="font-size:8px; margin-right:4px; vertical-align:middle;"></i>'+a.help+'</span>' +
    rightIcon +
  '</div>';
}

function _buildGroupHeader(groupName) {
  return '<div style="display:flex; align-items:center; gap:8px; padding:8px 12px; background:#fafafa; border-bottom:1px solid #e8e8e8; border-top:1px solid #e8e8e8;">' +
    '<i class="fa-solid fa-layer-group" style="color:#1890ff; font-size:12px;"></i>' +
    '<span class="group-name-label" style="font-size:13px; font-weight:600; color:#333; flex:1;">' + groupName + '</span>' +
    '<i class="fa-regular fa-pen-to-square" style="color:#1890ff; font-size:12px; cursor:pointer; opacity:0.7;" onclick="event.stopPropagation(); editGroupName(this)" title="编辑分组"></i>' +
    '<i class="fa-regular fa-trash-can" style="color:#ff4d4f; font-size:12px; cursor:pointer; opacity:0.7; margin-left:4px;" onclick="event.stopPropagation(); confirmDelete(\'' + groupName + '\')" title="删除分组"></i>' +
  '</div>';
}

function toggleAttrEnabled(iconEl) {
  var row = iconEl.closest('[data-attr-key]');
  if (!row) return;
  var isEnabled = iconEl.classList.contains('fa-eye');
  if (isEnabled) {
    iconEl.classList.remove('fa-eye');
    iconEl.classList.add('fa-eye-slash');
    iconEl.style.color = '#c9cdd4';
    iconEl.title = '点击启用';
    row.style.background = 'rgba(245,63,63,0.06)';
    row.style.borderLeft = '3px solid rgba(245,63,63,0.35)';
    row.querySelectorAll('label, span, a, i:not(.attr-toggle-icon):not(.fa-grip-vertical)').forEach(function(el) {
      el.style.color = '#c0c0c0';
    });
    row.querySelectorAll('input, select, textarea').forEach(function(el) {
      el.disabled = true;
      el.style.background = 'rgba(245,63,63,0.04)';
      el.style.color = '#bbb';
      el.style.borderColor = 'rgba(245,63,63,0.2)';
    });
    row.querySelectorAll('.fa-circle-plus, .fa-up-right-and-down-left-from-center').forEach(function(el) {
      el.style.color = '#c0c0c0';
    });
  } else {
    iconEl.classList.remove('fa-eye-slash');
    iconEl.classList.add('fa-eye');
    iconEl.style.color = '#1890ff';
    iconEl.title = '点击禁用';
    row.style.background = '';
    row.style.borderLeft = '';
    row.querySelectorAll('label').forEach(function(el) { el.style.color = '#333'; });
    row.querySelectorAll('span').forEach(function(el) { el.style.color = ''; });
    row.querySelectorAll('a').forEach(function(el) { el.style.color = '#1890ff'; });
    row.querySelectorAll('.fa-regular.fa-circle').forEach(function(el) { el.style.color = ''; });
    row.querySelectorAll('input, select, textarea').forEach(function(el) {
      el.disabled = false;
      el.style.background = '#fff';
      el.style.color = '#333';
      el.style.borderColor = '#d9d9d9';
    });
    row.querySelectorAll('select').forEach(function(el) {
      el.style.color = el.value ? '#333' : '#999';
    });
    row.querySelectorAll('.fa-circle-plus').forEach(function(el) { el.style.color = '#1890ff'; });
    row.querySelectorAll('.fa-up-right-and-down-left-from-center').forEach(function(el) { el.style.color = '#999'; });
  }
}

function editGroupName(iconEl) {
  var row = iconEl.closest('div');
  var label = row.querySelector('.group-name-label');
  if (!label) return;
  var current = label.textContent;
  var input = document.createElement('input');
  input.type = 'text';
  input.value = current;
  input.style.cssText = 'font-size:13px;font-weight:600;color:#333;flex:1;height:26px;border:1px solid #1890ff;border-radius:4px;padding:0 8px;outline:none;box-sizing:border-box;background:#fff;';
  label.replaceWith(input);
  input.focus();
  input.select();
  var save = function() {
    var newVal = input.value.trim() || current;
    var span = document.createElement('span');
    span.className = 'group-name-label';
    span.style.cssText = 'font-size:13px;font-weight:600;color:#333;flex:1;';
    span.textContent = newVal;
    input.replaceWith(span);
  };
  input.addEventListener('blur', save);
  input.addEventListener('keydown', function(e) {
    if (e.key === 'Enter') { e.preventDefault(); input.blur(); }
    if (e.key === 'Escape') { input.value = current; input.blur(); }
  });
}

function renderIndicatorModel(container, config) {
  var rows = '';
  var lastGroup = '';
  _modelAttrs.forEach(function(a, idx) {
    if (a.group && a.group !== lastGroup) {
      rows += _buildGroupHeader(a.group);
      lastGroup = a.group;
    }
    rows += _buildAttrRow(a, idx === 0);
  });

  _currentCfgKey = 'seq';
  var initCfg = _modelAttrConfigs['seq'];

  container.innerHTML =
    '<div style="display:flex; height:100%; background:#fff; overflow:hidden;">' +
      '<div style="flex:1; display:flex; flex-direction:column; overflow:hidden; min-width:0;">' +
        '<div style="display:flex; align-items:center; justify-content:space-between; padding:10px 16px; border-bottom:1px solid #e8e8e8; flex-shrink:0;">' +
          '<span style="font-size:15px; font-weight:600; color:#333;">模板管理</span>' +
          '<div style="display:flex;gap:8px;">' +
            '<button class="btn btn-sm" onclick="alert(\'新增分组\')"><i class="fa-solid fa-folder-plus" style="margin-right:4px;"></i>新增分组</button>' +
            '<button class="btn btn-primary btn-sm"><i class="fa-solid fa-plus" style="margin-right:4px;"></i>新增属性</button>' +
          '</div>' +
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
  _currentCfgKey = key;
  var list = document.getElementById('model-attr-list');
  if (!list) return;
  list.querySelectorAll('[data-attr-key]').forEach(function(r) {
    var isDisabled = r.querySelector('.fa-eye-slash.attr-toggle-icon');
    if (isDisabled) return;
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
  var isCurrentDisabled = el.querySelector('.fa-eye-slash.attr-toggle-icon');
  if (!isCurrentDisabled) {
    el.style.borderLeft = '3px solid #1890ff';
    el.style.background = '#fafcff';
  }
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

// ============ 模板管理 - 分类属性目录树 ============
function _buildModelCatTree() {
  var ic = 'fa-solid fa-folder';
  var ico = 'fa-solid fa-folder-open';
  var cs = 'color:#f5a623; font-size:13px;';
  var ns = 'font-size:13px; color:#333;';
  var caret = '<i class="fa-solid fa-caret-right" style="color:#999; font-size:10px; width:10px; transition:transform .2s; transform:rotate(90deg);"></i>';

  function leaf(name, indent) {
    return '<div style="padding:5px 12px 5px '+indent+'px; cursor:pointer; display:flex; align-items:center; gap:6px;" ' +
      'onmouseover="this.style.background=\'#f2f3f5\'" onmouseout="this.style.background=\'\'" ' +
      'onclick="event.stopPropagation(); selectModelCatNode(this,\''+name+'\')">' +
      '<i class="'+ic+'" style="'+cs+'"></i><span style="'+ns+'">'+name+'</span></div>';
  }

  function branch(name, indent, children) {
    return '<div style="padding:5px 12px 5px '+indent+'px; cursor:pointer; display:flex; align-items:center; gap:6px;" ' +
      'onmouseover="this.style.background=\'#f2f3f5\'" onmouseout="this.style.background=\'\'" ' +
      'onclick="event.stopPropagation(); var s=this.nextElementSibling; s.style.display=s.style.display===\'none\'?\'block\':\'none\'; var c=this.querySelector(\'.fa-caret-right\'); if(c) c.style.transform=c.style.transform===\'rotate(90deg)\'?\'rotate(0deg)\':\'rotate(90deg)\';">' +
      caret + '<i class="'+ico+'" style="'+cs+'"></i><span style="'+ns+'">'+name+'</span></div>' +
      '<div style="display:block;">' + children + '</div>';
  }

  return leaf('财务数据指标', 12) +
    branch('指标体系', 12, leaf('免审', 40)) +
    branch('华润集团', 12, leaf('集团（不区分业态）', 40)) +
    branch('人力资源', 12,
      branch('员工关系', 40, leaf('人员规模', 68))
    );
}

function toggleModelCatTree(wrapper) {
  var dd = wrapper.querySelector('.model-cat-dropdown');
  if (!dd) return;
  var show = dd.style.display === 'none';
  dd.style.display = show ? 'block' : 'none';
  if (show) {
    setTimeout(function() {
      document.addEventListener('click', _closeModelCatTree);
    }, 0);
  }
}

function _closeModelCatTree() {
  var dd = document.querySelector('.model-cat-dropdown');
  if (dd) dd.style.display = 'none';
  document.removeEventListener('click', _closeModelCatTree);
}

function selectModelCatNode(el, name) {
  var label = el.closest('[data-attr-key="category"]').querySelector('.model-cat-label');
  if (label) {
    label.textContent = name;
    label.style.color = '#333';
  }
  var dd = el.closest('.model-cat-dropdown');
  if (dd) dd.style.display = 'none';
  document.removeEventListener('click', _closeModelCatTree);
}

// ============ 维度 - 过滤条件面板 ============
function toggleDimFilterPanel(trigger) {
  var existing = document.getElementById('dim-filter-panel');
  if (existing) { existing.remove(); return; }

  var panel = document.createElement('div');
  panel.id = 'dim-filter-panel';
  panel.style.cssText = 'position:absolute; top:100%; left:0; z-index:300; background:#fff; border:1px solid #d9d9d9; border-radius:6px; box-shadow:0 4px 16px rgba(0,0,0,.15); padding:16px; width:280px; margin-top:6px;';
  panel.innerHTML =
    '<div style="font-size:13px; font-weight:600; color:#333; margin-bottom:12px;">过滤条件</div>' +
    '<div style="margin-bottom:10px;">' +
      '<div style="display:flex; align-items:center; gap:8px; margin-bottom:4px;">' +
        '<span style="color:#f53f3f;">*</span><span style="font-size:12px; color:#333; min-width:50px;">维度表：</span>' +
      '</div>' +
      '<select style="width:100%; height:32px; border:1px solid #1890ff; border-radius:4px; padding:0 10px; font-size:13px; outline:none; box-sizing:border-box; background:#fff; appearance:auto;">' +
        '<option>人员分类</option><option>时间维度</option><option>组织维度</option><option>产品维度</option>' +
      '</select>' +
    '</div>' +
    '<div style="margin-bottom:10px;">' +
      '<div style="display:flex; align-items:center; gap:8px; margin-bottom:4px;">' +
        '<span style="color:#f53f3f;">*</span><span style="font-size:12px; color:#333; min-width:50px;">条件：</span>' +
      '</div>' +
      '<select style="width:100%; height:32px; border:1px solid #d9d9d9; border-radius:4px; padding:0 10px; font-size:13px; outline:none; box-sizing:border-box; background:#fff; appearance:auto;">' +
        '<option>等于</option><option>不等于</option><option>包含</option><option>不包含</option>' +
      '</select>' +
    '</div>' +
    '<div style="margin-bottom:14px;">' +
      '<div style="display:flex; align-items:center; gap:8px; margin-bottom:4px;">' +
        '<span style="color:#f53f3f;">*</span><span style="font-size:12px; color:#333; min-width:50px;">值：</span>' +
      '</div>' +
      '<select style="width:100%; height:32px; border:1px solid #1890ff; border-radius:4px; padding:0 10px; font-size:13px; outline:none; box-sizing:border-box; background:#fff; appearance:auto;">' +
        '<option>在岗职工</option><option>合同工</option><option>临时工</option><option>退休人员</option>' +
      '</select>' +
    '</div>' +
    '<div style="display:flex; justify-content:flex-end; gap:8px;">' +
      '<button class="btn btn-sm" style="min-width:56px; height:30px;" onclick="closeDimFilterPanel()">取消</button>' +
      '<button class="btn btn-primary btn-sm" style="min-width:56px; height:30px;" onclick="closeDimFilterPanel()">保存</button>' +
    '</div>';

  trigger.style.position = 'relative';
  trigger.appendChild(panel);

  panel.addEventListener('click', function(e) { e.stopPropagation(); });

  setTimeout(function() {
    document.addEventListener('click', _closeDimFilterOnClick);
  }, 0);
}

function closeDimFilterPanel() {
  var el = document.getElementById('dim-filter-panel');
  if (el) el.remove();
  document.removeEventListener('click', _closeDimFilterOnClick);
}

function _closeDimFilterOnClick(e) {
  var panel = document.getElementById('dim-filter-panel');
  if (panel && !panel.contains(e.target)) {
    closeDimFilterPanel();
  }
}
