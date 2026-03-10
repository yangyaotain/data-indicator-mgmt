/* ========================================
   可视化模块 - 看板管理等页面
   ======================================== */

function renderDashboardMgmt() {
  const contentArea = document.getElementById('content-area');

  const dashboards = [
    { name: '监控体系', id: 'db-1' },
    { name: 'AOM看板测试1', id: 'db-2' },
    { name: '监控体系Demo', id: 'db-3' },
    { name: '物流大屏', id: 'db-4' },
    { name: 'Un2', id: 'db-5' },
  ];

  function makeSvgThumb(id) {
    return `<svg width="150" height="90" viewBox="0 0 200 120" xmlns="http://www.w3.org/2000/svg">
      <defs>
        <linearGradient id="bg-${id}" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" style="stop-color:#e8f4fd"/><stop offset="100%" style="stop-color:#d0ebff"/>
        </linearGradient>
        <linearGradient id="orb-${id}" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" style="stop-color:#4da6e8;stop-opacity:0.6"/><stop offset="100%" style="stop-color:#2188d9;stop-opacity:0.3"/>
        </linearGradient>
      </defs>
      <rect width="200" height="120" fill="url(#bg-${id})"/>
      <circle cx="100" cy="55" r="35" fill="url(#orb-${id})" opacity="0.7"/>
      <circle cx="100" cy="55" r="20" fill="none" stroke="#4da6e8" stroke-width="1" opacity="0.5"/>
      <circle cx="100" cy="55" r="28" fill="none" stroke="#4da6e8" stroke-width="0.5" opacity="0.3"/>
      <path d="M 30 90 Q 65 70, 100 80 T 170 65" fill="none" stroke="#3498db" stroke-width="1.5" opacity="0.6"/>
      <path d="M 20 100 Q 60 85, 105 90 T 180 78" fill="none" stroke="#5dade2" stroke-width="1" opacity="0.4"/>
      <circle cx="60" cy="40" r="2" fill="#3498db" opacity="0.4"/>
      <circle cx="140" cy="35" r="1.5" fill="#3498db" opacity="0.3"/>
    </svg>`;
  }

  const cardItems = dashboards.map(d => `
    <div style="flex:0 0 150px; width:150px; cursor:pointer; border-radius:4px;" onclick="alert('打开看板：${d.name}')">
      <div style="width:150px; height:90px; border-radius:4px; overflow:hidden; background:#e8f4fd; border:1px solid #e8e8e8;">
        ${makeSvgThumb(d.id)}
      </div>
      <div style="padding:6px 2px; font-size:12px; color:#333; white-space:nowrap; overflow:hidden; text-overflow:ellipsis;">${d.name}</div>
    </div>
  `).join('');

  contentArea.innerHTML = `
    <div style="padding:16px 20px;">
      <!-- 页面标题 -->
      <div style="display:flex; align-items:center; gap:6px; margin-bottom:14px;">
        <i class="fa-solid fa-search" style="color:#999; font-size:13px;"></i>
        <span style="font-size:14px; font-weight:500; color:#333;">看板管理</span>
      </div>

      <!-- 搜索栏 + 视图切换 -->
      <div style="display:flex; align-items:center; justify-content:space-between; margin-bottom:16px;">
        <div style="display:flex; align-items:center; gap:8px;">
          <div style="position:relative; width:240px;">
            <i class="fa-solid fa-search" style="position:absolute; left:10px; top:50%; transform:translateY(-50%); color:#bbb; font-size:13px; pointer-events:none;"></i>
            <input type="text" placeholder="请输入" style="width:100%; height:32px; border:1px solid #d9d9d9; border-radius:4px; padding:0 10px 0 30px; font-size:13px; outline:none;" />
          </div>
          <button class="btn btn-primary btn-sm">查 询</button>
          <button class="btn btn-default btn-sm">重 置</button>
        </div>
        <div style="display:flex; align-items:center; gap:2px; border:1px solid #d9d9d9; border-radius:4px; overflow:hidden;">
          <span style="display:flex; align-items:center; justify-content:center; width:32px; height:30px; cursor:pointer; color:#1890ff; background:#e6f7ff; font-size:14px;" onclick="setKbView(this,'grid')">
            <i class="fa-solid fa-grip"></i>
          </span>
          <span style="display:flex; align-items:center; justify-content:center; width:32px; height:30px; cursor:pointer; color:#999; font-size:14px;" onclick="setKbView(this,'list')">
            <i class="fa-solid fa-bars"></i>
          </span>
        </div>
      </div>

      <!-- 卡片区域 -->
      <div style="display:flex; flex-wrap:wrap; gap:16px; align-items:flex-start;">
        <!-- 新建看板卡片 -->
        <div style="flex:0 0 100px; width:100px; border:1px dashed #d9d9d9; border-radius:4px; cursor:pointer;" onclick="alert('新建看板')">
          <div style="width:100px; height:90px; display:flex; flex-direction:column; align-items:center; justify-content:center; gap:6px;">
            <i class="fa-solid fa-plus" style="font-size:20px; color:#1890ff;"></i>
            <span style="font-size:13px; color:#1890ff;">新建看板</span>
          </div>
        </div>
        ${cardItems}
      </div>

      <!-- 分页 -->
      <div style="display:flex; align-items:center; justify-content:flex-end; gap:12px; margin-top:24px; padding:8px 0; font-size:13px; color:#666;">
        <span style="color:#999;">总共 ${dashboards.length} 条数据</span>
        <div style="display:flex; align-items:center; gap:4px;">
          <span style="display:flex; align-items:center; justify-content:center; width:28px; height:28px; border:1px solid #d9d9d9; border-radius:4px; color:#d9d9d9; cursor:not-allowed; font-size:11px;"><i class="fa-solid fa-chevron-left"></i></span>
          <span style="display:flex; align-items:center; justify-content:center; width:28px; height:28px; border:1px solid #1890ff; border-radius:4px; color:#1890ff; font-size:13px;">1</span>
          <span style="display:flex; align-items:center; justify-content:center; width:28px; height:28px; border:1px solid #d9d9d9; border-radius:4px; color:#666; cursor:pointer; font-size:11px;"><i class="fa-solid fa-chevron-right"></i></span>
        </div>
        <span>20 条/页</span>
      </div>
    </div>
  `;
}

function setKbView(el, mode) {
  const parent = el.parentElement;
  Array.from(parent.children).forEach(s => {
    s.style.color = '#999';
    s.style.background = 'transparent';
  });
  el.style.color = '#1890ff';
  el.style.background = '#e6f7ff';
}

/* ========================================
   仪表盘列表页面
   ======================================== */

function renderDashboard() {
  const contentArea = document.getElementById('content-area');

  const catTree = [
    { name: '全部', icon: 'fa-solid fa-folder', children: null, selected: true },
    { name: 'test', icon: 'fa-solid fa-folder', children: null },
    { name: '微天一君兰', icon: 'fa-solid fa-folder', children: [
      { name: '销售线', icon: 'fa-solid fa-folder', children: [
        { name: '销售订单', icon: 'fa-solid fa-folder' },
        { name: '客户分析', icon: 'fa-solid fa-folder' },
      ]},
      { name: '计划线', icon: 'fa-solid fa-folder', children: [
        { name: '订单产品设备', icon: 'fa-solid fa-folder' },
      ]},
      { name: '采购线', icon: 'fa-solid fa-folder', children: [
        { name: '采购原辅材料', icon: 'fa-solid fa-folder' },
      ]},
      { name: '生产线', icon: 'fa-solid fa-folder', children: null },
      { name: '物流整合', icon: 'fa-solid fa-folder', children: null },
      { name: 'aotian-tb', icon: 'fa-solid fa-folder', children: null },
    ]},
    { name: '人力资源', icon: 'fa-solid fa-folder', children: [
      { name: '员工关系', icon: 'fa-solid fa-folder', children: [
        { name: '人员规模', icon: 'fa-solid fa-folder' },
      ]},
    ]},
  ];

  const dashItems = [
    { name: '高格展示图数', type: 'bar-blue' },
    { name: 'test', type: 'bar-small' },
    { name: 'test客户活跃度', type: 'multi-color' },
    { name: '设备产出', type: 'bar-yellow' },
    { name: '设备耗料', type: 'bar-mix' },
    { name: '折线柱状图', type: 'line-bar' },
    { name: '排序指标卡', type: 'bar-blue' },
    { name: '本年度销售排序与过滤', type: 'bar-small' },
    { name: '客户退货率同评比分析', type: 'multi-color' },
    { name: '设备运行趋势分析', type: 'line-bar' },
    { name: '设备故障率', type: 'bar-yellow' },
    { name: 'test', type: 'bar-mix' },
    { name: '订单交付及时性趋势分析', type: 'bar-blue' },
    { name: '注：截止计划完成间至当月的完...', type: 'bar-small' },
    { name: '成品质量统计分析', type: 'multi-color' },
    { name: '设备台数', type: 'bar-yellow' },
    { name: '不良原因数量统计分析', type: 'bar-mix' },
    { name: '跟踪的生产工单趋势分析', type: 'bar-blue' },
    { name: '直通率', type: 'line-bar' },
    { name: '工单备审', type: 'bar-small' },
  ];

  const barHeights = [45,62,38,55,70,48,60,35,52,67,42,58,50,65,40,55,72,46,63,37];

  function makeChartSvg(type, idx) {
    const h = barHeights;
    const s = idx * 3;
    const charts = {
      'bar-blue': `<svg viewBox="0 0 160 90" xmlns="http://www.w3.org/2000/svg">
        <rect width="160" height="90" fill="#f8fbff"/>
        <rect x="10" y="${90-h[(s)%20]}" width="12" height="${h[(s)%20]}" fill="#4a90d9" rx="1"/>
        <rect x="28" y="${90-h[(s+1)%20]}" width="12" height="${h[(s+1)%20]}" fill="#4a90d9" rx="1"/>
        <rect x="46" y="${90-h[(s+2)%20]}" width="12" height="${h[(s+2)%20]}" fill="#4a90d9" rx="1"/>
        <rect x="64" y="${90-h[(s+3)%20]}" width="12" height="${h[(s+3)%20]}" fill="#4a90d9" rx="1"/>
        <rect x="82" y="${90-h[(s+4)%20]}" width="12" height="${h[(s+4)%20]}" fill="#4a90d9" rx="1"/>
        <rect x="100" y="${90-h[(s+5)%20]}" width="12" height="${h[(s+5)%20]}" fill="#4a90d9" rx="1"/>
        <rect x="118" y="${90-h[(s+6)%20]}" width="12" height="${h[(s+6)%20]}" fill="#4a90d9" rx="1"/>
        <rect x="136" y="${90-h[(s+7)%20]}" width="12" height="${h[(s+7)%20]}" fill="#4a90d9" rx="1"/>
      </svg>`,
      'bar-small': `<svg viewBox="0 0 160 90" xmlns="http://www.w3.org/2000/svg">
        <rect width="160" height="90" fill="#fafafa"/>
        <rect x="15" y="${90-h[(s)%20]*0.7}" width="14" height="${h[(s)%20]*0.7}" fill="#5b9bd5" opacity="0.7" rx="1"/>
        <rect x="37" y="${90-h[(s+1)%20]*0.7}" width="14" height="${h[(s+1)%20]*0.7}" fill="#5b9bd5" opacity="0.7" rx="1"/>
        <rect x="59" y="${90-h[(s+2)%20]*0.7}" width="14" height="${h[(s+2)%20]*0.7}" fill="#5b9bd5" opacity="0.7" rx="1"/>
        <rect x="81" y="${90-h[(s+3)%20]*0.7}" width="14" height="${h[(s+3)%20]*0.7}" fill="#5b9bd5" opacity="0.7" rx="1"/>
        <rect x="103" y="${90-h[(s+4)%20]*0.7}" width="14" height="${h[(s+4)%20]*0.7}" fill="#5b9bd5" opacity="0.7" rx="1"/>
        <rect x="125" y="${90-h[(s+5)%20]*0.7}" width="14" height="${h[(s+5)%20]*0.7}" fill="#5b9bd5" opacity="0.7" rx="1"/>
      </svg>`,
      'multi-color': `<svg viewBox="0 0 160 90" xmlns="http://www.w3.org/2000/svg">
        <rect width="160" height="90" fill="#f8fbff"/>
        <rect x="8" y="${90-h[(s)%20]}" width="5" height="${h[(s)%20]}" fill="#4a90d9" rx="1"/>
        <rect x="14" y="${90-h[(s+1)%20]*0.8}" width="5" height="${h[(s+1)%20]*0.8}" fill="#f5a623" rx="1"/>
        <rect x="33" y="${90-h[(s+2)%20]}" width="5" height="${h[(s+2)%20]}" fill="#4a90d9" rx="1"/>
        <rect x="39" y="${90-h[(s+3)%20]*0.8}" width="5" height="${h[(s+3)%20]*0.8}" fill="#f5a623" rx="1"/>
        <rect x="45" y="${90-h[(s+4)%20]*0.6}" width="5" height="${h[(s+4)%20]*0.6}" fill="#50b583" rx="1"/>
        <rect x="58" y="${90-h[(s+5)%20]}" width="5" height="${h[(s+5)%20]}" fill="#4a90d9" rx="1"/>
        <rect x="64" y="${90-h[(s+6)%20]*0.8}" width="5" height="${h[(s+6)%20]*0.8}" fill="#f5a623" rx="1"/>
        <rect x="83" y="${90-h[(s+7)%20]}" width="5" height="${h[(s+7)%20]}" fill="#4a90d9" rx="1"/>
        <rect x="89" y="${90-h[(s+8)%20]*0.7}" width="5" height="${h[(s+8)%20]*0.7}" fill="#e85d5d" rx="1"/>
        <rect x="108" y="${90-h[(s+9)%20]*0.9}" width="5" height="${h[(s+9)%20]*0.9}" fill="#4a90d9" rx="1"/>
        <rect x="114" y="${90-h[(s+10)%20]*0.7}" width="5" height="${h[(s+10)%20]*0.7}" fill="#50b583" rx="1"/>
        <rect x="133" y="${90-h[(s+11)%20]}" width="5" height="${h[(s+11)%20]}" fill="#f5a623" rx="1"/>
        <rect x="139" y="${90-h[(s+12)%20]*0.6}" width="5" height="${h[(s+12)%20]*0.6}" fill="#4a90d9" rx="1"/>
      </svg>`,
      'bar-yellow': `<svg viewBox="0 0 160 90" xmlns="http://www.w3.org/2000/svg">
        <rect width="160" height="90" fill="#fffcf5"/>
        <rect x="10" y="${90-h[(s)%20]}" width="13" height="${h[(s)%20]}" fill="#f5a623" opacity="0.8" rx="1"/>
        <rect x="30" y="${90-h[(s+1)%20]}" width="13" height="${h[(s+1)%20]}" fill="#f5a623" opacity="0.7" rx="1"/>
        <rect x="50" y="${90-h[(s+2)%20]}" width="13" height="${h[(s+2)%20]}" fill="#f5a623" opacity="0.8" rx="1"/>
        <rect x="70" y="${90-h[(s+3)%20]}" width="13" height="${h[(s+3)%20]}" fill="#f5a623" opacity="0.7" rx="1"/>
        <rect x="90" y="${90-h[(s+4)%20]}" width="13" height="${h[(s+4)%20]}" fill="#f5a623" opacity="0.8" rx="1"/>
        <rect x="110" y="${90-h[(s+5)%20]}" width="13" height="${h[(s+5)%20]}" fill="#f5a623" opacity="0.7" rx="1"/>
        <rect x="130" y="${90-h[(s+6)%20]}" width="13" height="${h[(s+6)%20]}" fill="#f5a623" opacity="0.8" rx="1"/>
      </svg>`,
      'bar-mix': `<svg viewBox="0 0 160 90" xmlns="http://www.w3.org/2000/svg">
        <rect width="160" height="90" fill="#f8fbff"/>
        <rect x="10" y="${90-h[(s)%20]}" width="8" height="${h[(s)%20]}" fill="#4a90d9" rx="1"/>
        <rect x="19" y="${90-h[(s+1)%20]*0.7}" width="8" height="${h[(s+1)%20]*0.7}" fill="#f5a623" rx="1"/>
        <rect x="34" y="${90-h[(s+2)%20]}" width="8" height="${h[(s+2)%20]}" fill="#4a90d9" rx="1"/>
        <rect x="43" y="${90-h[(s+3)%20]*0.8}" width="8" height="${h[(s+3)%20]*0.8}" fill="#f5a623" rx="1"/>
        <rect x="58" y="${90-h[(s+4)%20]}" width="8" height="${h[(s+4)%20]}" fill="#4a90d9" rx="1"/>
        <rect x="67" y="${90-h[(s+5)%20]*0.6}" width="8" height="${h[(s+5)%20]*0.6}" fill="#f5a623" rx="1"/>
        <rect x="82" y="${90-h[(s+6)%20]}" width="8" height="${h[(s+6)%20]}" fill="#4a90d9" rx="1"/>
        <rect x="91" y="${90-h[(s+7)%20]*0.9}" width="8" height="${h[(s+7)%20]*0.9}" fill="#f5a623" rx="1"/>
        <rect x="106" y="${90-h[(s+8)%20]}" width="8" height="${h[(s+8)%20]}" fill="#4a90d9" rx="1"/>
        <rect x="115" y="${90-h[(s+9)%20]*0.7}" width="8" height="${h[(s+9)%20]*0.7}" fill="#f5a623" rx="1"/>
      </svg>`,
      'line-bar': `<svg viewBox="0 0 160 90" xmlns="http://www.w3.org/2000/svg">
        <rect width="160" height="90" fill="#f8fbff"/>
        <rect x="10" y="${90-h[(s)%20]*0.6}" width="12" height="${h[(s)%20]*0.6}" fill="#5b9bd5" opacity="0.6" rx="1"/>
        <rect x="30" y="${90-h[(s+1)%20]*0.6}" width="12" height="${h[(s+1)%20]*0.6}" fill="#5b9bd5" opacity="0.6" rx="1"/>
        <rect x="50" y="${90-h[(s+2)%20]*0.6}" width="12" height="${h[(s+2)%20]*0.6}" fill="#5b9bd5" opacity="0.6" rx="1"/>
        <rect x="70" y="${90-h[(s+3)%20]*0.6}" width="12" height="${h[(s+3)%20]*0.6}" fill="#5b9bd5" opacity="0.6" rx="1"/>
        <rect x="90" y="${90-h[(s+4)%20]*0.6}" width="12" height="${h[(s+4)%20]*0.6}" fill="#5b9bd5" opacity="0.6" rx="1"/>
        <rect x="110" y="${90-h[(s+5)%20]*0.6}" width="12" height="${h[(s+5)%20]*0.6}" fill="#5b9bd5" opacity="0.6" rx="1"/>
        <rect x="130" y="${90-h[(s+6)%20]*0.6}" width="12" height="${h[(s+6)%20]*0.6}" fill="#5b9bd5" opacity="0.6" rx="1"/>
        <polyline points="16,${90-h[(s)%20]*0.5} 36,${90-h[(s+1)%20]*0.55} 56,${90-h[(s+2)%20]*0.45} 76,${90-h[(s+3)%20]*0.5} 96,${90-h[(s+4)%20]*0.55} 116,${90-h[(s+5)%20]*0.45} 136,${90-h[(s+6)%20]*0.5}" fill="none" stroke="#f5a623" stroke-width="1.5"/>
      </svg>`,
    };
    return charts[type] || charts['bar-blue'];
  }

  function renderTreeNode(node, depth) {
    const indent = depth * 16;
    const hasChildren = node.children && node.children.length > 0;
    const sel = node.selected ? ' selected' : '';
    let html = `<div class="cat-node${sel}" style="padding-left:${16+indent}px;" onclick="selectDashCatNode(this, '${node.name}')">`;
    if (hasChildren) {
      html += `<i class="fa-solid fa-caret-down" style="font-size:10px; width:14px; color:#999;"></i>`;
    } else {
      html += `<span style="width:14px; display:inline-block;"></span>`;
    }
    html += `<i class="fa-solid fa-folder cat-icon" style="color:${node.selected ? '#1890ff' : '#f5c542'}; font-size:13px; margin:0 6px;"></i>`;
    html += `<span style="font-size:13px; flex:1; overflow:hidden; text-overflow:ellipsis; white-space:nowrap;">${node.name}</span>`;
    html += `</div>`;
    if (hasChildren) {
      node.children.forEach(c => { html += renderTreeNode(c, depth + 1); });
    }
    return html;
  }

  let treeHtml = '';
  catTree.forEach(n => { treeHtml += renderTreeNode(n, 0); });

  const cardHtml = dashItems.map((d, i) => `
    <div style="flex:0 0 calc(16.666% - 14px); min-width:130px; max-width:180px; cursor:pointer; border-radius:4px; border:1px solid #e8e8e8; overflow:hidden; transition:box-shadow 0.2s;" onmouseover="this.style.boxShadow='0 2px 8px rgba(0,0,0,0.1)'" onmouseout="this.style.boxShadow='none'" onclick="openDashboardEditor('${d.name}')">
      <div style="width:100%; height:80px; overflow:hidden; background:#f8fbff;">
        ${makeChartSvg(d.type, i)}
      </div>
      <div style="padding:6px 8px; font-size:12px; color:#333; white-space:nowrap; overflow:hidden; text-overflow:ellipsis; border-top:1px solid #f0f0f0;">${d.name}</div>
    </div>
  `).join('');

  contentArea.innerHTML = `
    <div style="display:flex; height:100%; background:#fff;">
      <!-- 左侧分类树 -->
      <div style="width:180px; min-width:180px; border-right:1px solid #e8e8e8; display:flex; flex-direction:column; overflow:hidden;">
        <div style="display:flex; align-items:center; justify-content:space-between; padding:10px 12px; border-bottom:1px solid #f0f0f0;">
          <div style="display:flex; align-items:center; gap:6px;">
            <i class="fa-solid fa-bars" style="color:#999; font-size:12px;"></i>
            <span style="font-size:13px; font-weight:500; color:#333;">仪表盘分类</span>
          </div>
          <span style="display:flex; align-items:center; justify-content:center; width:22px; height:22px; background:#1890ff; color:#fff; border-radius:3px; cursor:pointer; font-size:12px;" onclick="alert('新建分类')">
            <i class="fa-solid fa-plus"></i>
          </span>
        </div>
        <div style="padding:6px 8px;">
          <div style="position:relative;">
            <i class="fa-solid fa-search" style="position:absolute; left:8px; top:50%; transform:translateY(-50%); color:#bbb; font-size:12px;"></i>
            <input type="text" placeholder="请输入" style="width:100%; height:28px; border:1px solid #d9d9d9; border-radius:4px; padding:0 8px 0 26px; font-size:12px; outline:none; box-sizing:border-box;" />
          </div>
        </div>
        <div class="category-tree" style="flex:1; overflow-y:auto; padding:2px 0;">
          ${treeHtml}
        </div>
      </div>

      <!-- 右侧内容区域 -->
      <div style="flex:1; display:flex; flex-direction:column; overflow:hidden; min-width:0;">
        <!-- 面包屑 -->
        <div style="display:flex; align-items:center; gap:6px; padding:10px 16px; border-bottom:1px solid #f0f0f0;">
          <i class="fa-solid fa-folder" style="color:#f5c542; font-size:14px;"></i>
          <span style="font-size:14px; font-weight:500; color:#333;">全部</span>
        </div>

        <!-- 搜索栏 + 视图切换 -->
        <div style="display:flex; align-items:center; justify-content:space-between; padding:10px 16px;">
          <div style="display:flex; align-items:center; gap:8px;">
            <div style="position:relative; width:220px;">
              <i class="fa-solid fa-search" style="position:absolute; left:10px; top:50%; transform:translateY(-50%); color:#bbb; font-size:12px; pointer-events:none;"></i>
              <input type="text" placeholder="请输入" style="width:100%; height:30px; border:1px solid #d9d9d9; border-radius:4px; padding:0 10px 0 28px; font-size:13px; outline:none; box-sizing:border-box;" />
            </div>
            <button class="btn btn-primary btn-sm">查 询</button>
            <button class="btn btn-default btn-sm">重 置</button>
          </div>
          <div style="display:flex; align-items:center; gap:2px; border:1px solid #d9d9d9; border-radius:4px; overflow:hidden;">
            <span style="display:flex; align-items:center; justify-content:center; width:30px; height:28px; cursor:pointer; color:#1890ff; background:#e6f7ff; font-size:13px;" onclick="setKbView(this,'grid')">
              <i class="fa-solid fa-grip"></i>
            </span>
            <span style="display:flex; align-items:center; justify-content:center; width:30px; height:28px; cursor:pointer; color:#999; font-size:13px;" onclick="setKbView(this,'list')">
              <i class="fa-solid fa-bars"></i>
            </span>
          </div>
        </div>

        <!-- 卡片网格 -->
        <div style="flex:1; overflow-y:auto; padding:0 16px 16px;">
          <div style="display:flex; flex-wrap:wrap; gap:12px; align-items:flex-start;">
            <!-- 新建仪表盘 -->
            <div style="flex:0 0 calc(16.666% - 14px); min-width:130px; max-width:180px; border:1px dashed #d9d9d9; border-radius:4px; cursor:pointer;" onclick="openDashboardEditor('新建仪表盘')">
              <div style="height:96px; display:flex; flex-direction:column; align-items:center; justify-content:center; gap:6px;">
                <i class="fa-solid fa-plus" style="font-size:18px; color:#1890ff;"></i>
                <span style="font-size:12px; color:#1890ff;">新建仪表盘</span>
              </div>
            </div>
            ${cardHtml}
          </div>
        </div>

        <!-- 分页 -->
        <div style="display:flex; align-items:center; justify-content:flex-end; gap:10px; padding:8px 16px; border-top:1px solid #f0f0f0; font-size:12px; color:#666; flex-shrink:0;">
          <span style="color:#999;">总共 54 条数据</span>
          <div style="display:flex; align-items:center; gap:3px;">
            <span style="display:flex; align-items:center; justify-content:center; width:26px; height:26px; border:1px solid #d9d9d9; border-radius:4px; color:#d9d9d9; cursor:not-allowed; font-size:10px;"><i class="fa-solid fa-chevron-left"></i></span>
            <span style="display:flex; align-items:center; justify-content:center; width:26px; height:26px; border:1px solid #1890ff; border-radius:4px; color:#1890ff; font-size:12px; background:#e6f7ff;">1</span>
            <span style="display:flex; align-items:center; justify-content:center; width:26px; height:26px; border:1px solid #d9d9d9; border-radius:4px; color:#666; cursor:pointer; font-size:12px;">2</span>
            <span style="display:flex; align-items:center; justify-content:center; width:26px; height:26px; border:1px solid #d9d9d9; border-radius:4px; color:#666; cursor:pointer; font-size:12px;">3</span>
            <span style="display:flex; align-items:center; justify-content:center; width:26px; height:26px; border:1px solid #d9d9d9; border-radius:4px; color:#666; cursor:pointer; font-size:10px;"><i class="fa-solid fa-chevron-right"></i></span>
          </div>
          <span>20 条/页</span>
          <span style="color:#999;">∨</span>
          <span>跳至</span>
          <input type="text" style="width:40px; height:26px; border:1px solid #d9d9d9; border-radius:4px; text-align:center; font-size:12px; outline:none;" />
          <span>页</span>
        </div>
      </div>
    </div>
  `;
}

function selectDashCatNode(el, name) {
  el.closest('.category-tree').querySelectorAll('.cat-node').forEach(n => {
    n.classList.remove('selected');
    const icon = n.querySelector('.cat-icon');
    if (icon) icon.style.color = '#f5c542';
  });
  el.classList.add('selected');
  const icon = el.querySelector('.cat-icon');
  if (icon) icon.style.color = '#1890ff';
}

/* ========================================
   仪表盘新建/编辑页面
   ======================================== */

function openDashboardEditor(name) {
  const contentArea = document.getElementById('content-area');
  const title = name || 'test客户活跃度';

  const componentCategories = [
    { name: '对比指标卡', collapsed: true },
    { name: '单指标卡', collapsed: true },
    { name: '普通指标卡', collapsed: true },
    { name: '主副指标卡', collapsed: true },
    { name: '分级指标卡', collapsed: true },
    { name: '综合指标卡', collapsed: true },
    { name: '其他组件', collapsed: true },
    { name: '折线图', collapsed: true },
    { name: '柱状图', collapsed: false, items: [
      { icon: 'fa-solid fa-chart-column', label: '柱状图' },
      { icon: 'fa-solid fa-chart-bar', label: '簇状柱状图' },
      { icon: 'fa-solid fa-chart-column', label: '标注气泡柱..' },
      { icon: 'fa-solid fa-chart-simple', label: '集币柱图' },
      { icon: 'fa-solid fa-chart-line', label: '折线柱状图', selected: true },
      { icon: 'fa-solid fa-layer-group', label: '堆叠柱状图' },
    ]},
    { name: '饼环图', collapsed: true },
    { name: '散点图', collapsed: true },
    { name: '雷达图', collapsed: true },
    { name: '漏斗图', collapsed: true },
    { name: '条形图', collapsed: true },
    { name: '表格', collapsed: true },
  ];

  let catHtml = componentCategories.map(cat => {
    const arrow = cat.collapsed ? 'fa-caret-right' : 'fa-caret-down';
    let html = `<div style="padding:0 12px;">
      <div style="display:flex; align-items:center; gap:6px; padding:7px 0; cursor:pointer; font-size:13px; color:#333;" onclick="this.parentElement.querySelector('.de-sub-items')&&this.parentElement.querySelector('.de-sub-items').style.display=this.parentElement.querySelector('.de-sub-items').style.display==='none'?'flex':'none'">
        <i class="fa-solid ${arrow}" style="font-size:10px; color:#999; width:10px;"></i>
        <span>${cat.name}</span>
      </div>`;
    if (cat.items) {
      html += `<div class="de-sub-items" style="display:${cat.collapsed ? 'none' : 'flex'}; flex-wrap:wrap; gap:6px; padding:0 0 8px 16px;">`;
      cat.items.forEach(item => {
        const sel = item.selected ? 'background:#e6f7ff; border-color:#1890ff; color:#1890ff;' : 'border-color:#e8e8e8; color:#666;';
        html += `<div style="display:flex; flex-direction:column; align-items:center; gap:3px; width:56px; padding:6px 2px; border:1px solid; border-radius:4px; cursor:pointer; font-size:10px; ${sel}" onclick="alert('选择组件：${item.label}')">
          <i class="${item.icon}" style="font-size:16px;"></i>
          <span style="white-space:nowrap; overflow:hidden; text-overflow:ellipsis; max-width:52px;">${item.label}</span>
        </div>`;
      });
      html += `</div>`;
    }
    html += `</div>`;
    return html;
  }).join('');

  const fields = ['t-year', 't-m', '十订单交付率', '十交易及利率', '十订单及时交付率'];
  const fieldListHtml = fields.map(f =>
    `<div style="padding:4px 8px; font-size:12px; color:#333; cursor:grab; border-bottom:1px solid #f5f5f5;">${f}</div>`
  ).join('');

  contentArea.innerHTML = `
    <div style="display:flex; height:100%; background:#fff; overflow:hidden;">
      <!-- 左侧：组件类型面板 -->
      <div style="width:170px; min-width:170px; border-right:1px solid #e8e8e8; display:flex; flex-direction:column; overflow:hidden;">
        <div style="padding:10px 12px; font-weight:500; font-size:13px; color:#333; border-bottom:1px solid #f0f0f0;">组件类型</div>
        <div style="padding:6px 8px;">
          <div style="position:relative;">
            <i class="fa-solid fa-search" style="position:absolute; left:8px; top:50%; transform:translateY(-50%); color:#bbb; font-size:11px;"></i>
            <input type="text" placeholder="请输入搜索关键字" style="width:100%; height:26px; border:1px solid #d9d9d9; border-radius:4px; padding:0 6px 0 24px; font-size:11px; outline:none; box-sizing:border-box;" />
          </div>
        </div>
        <div style="flex:1; overflow-y:auto;">
          ${catHtml}
        </div>
      </div>

      <!-- 中间：图表预览区域 -->
      <div style="flex:1; display:flex; flex-direction:column; overflow:hidden; min-width:0;">
        <!-- Tab 栏 -->
        <div style="display:flex; align-items:center; gap:0; padding:0 12px; border-bottom:1px solid #e8e8e8; height:38px; flex-shrink:0; background:#fafafa;">
          <span style="display:flex; align-items:center; gap:4px; color:#999; cursor:pointer; font-size:12px; padding:0 8px;" onclick="loadPage('dashboard')">
            <i class="fa-solid fa-chevron-left" style="font-size:10px;"></i>
          </span>
          <span style="display:flex; align-items:center; gap:4px; padding:6px 14px; background:#fff; border:1px solid #e8e8e8; border-bottom:none; border-radius:4px 4px 0 0; font-size:12px; color:#333; margin-bottom:-1px;">${title}</span>
          <span style="display:flex; align-items:center; justify-content:center; width:24px; height:24px; cursor:pointer; color:#999; font-size:12px; margin-left:4px;" onclick="alert('新建Tab')">
            <i class="fa-solid fa-plus"></i>
          </span>
        </div>

        <!-- 标题栏 -->
        <div style="display:flex; align-items:center; justify-content:space-between; padding:8px 16px; border-bottom:1px solid #f0f0f0; flex-shrink:0;">
          <div style="display:flex; align-items:center; gap:6px;">
            <span style="font-size:14px; font-weight:500; color:#333;">${title}</span>
            <i class="fa-solid fa-pen" style="font-size:11px; color:#999; cursor:pointer;"></i>
          </div>
          <div style="display:flex; align-items:center; gap:8px;">
            <button class="btn btn-default btn-sm">预 览</button>
            <button class="btn btn-default btn-sm">另存为</button>
            <button class="btn btn-primary btn-sm">保 存</button>
          </div>
        </div>

        <!-- 图表区域 -->
        <div style="flex:1; overflow:auto; padding:16px; display:flex; align-items:center; justify-content:center;">
          <div style="width:100%; max-width:700px;">
            <!-- 图例 -->
            <div style="display:flex; align-items:center; justify-content:center; gap:16px; margin-bottom:12px; font-size:11px; color:#666;">
              <span style="display:flex; align-items:center; gap:4px;"><span style="width:20px; height:10px; background:#4a90d9; border-radius:2px; display:inline-block;"></span>蓝灰温</span>
              <span style="display:flex; align-items:center; gap:4px;"><span style="width:20px; height:10px; background:#50b583; border-radius:2px; display:inline-block;"></span>绿色温</span>
              <span style="display:flex; align-items:center; gap:4px;"><span style="width:8px; height:8px; background:#f5a623; border-radius:50%; display:inline-block;"></span>指标</span>
            </div>
            <!-- 柱状图 SVG -->
            <svg viewBox="0 0 600 320" xmlns="http://www.w3.org/2000/svg" style="width:100%; height:auto;">
              <!-- Y轴刻度 -->
              <text x="25" y="20" font-size="11" fill="#999" text-anchor="end">180</text>
              <text x="25" y="68" font-size="11" fill="#999" text-anchor="end">150</text>
              <text x="25" y="116" font-size="11" fill="#999" text-anchor="end">120</text>
              <text x="25" y="164" font-size="11" fill="#999" text-anchor="end">90</text>
              <text x="25" y="212" font-size="11" fill="#999" text-anchor="end">50</text>
              <text x="25" y="260" font-size="11" fill="#999" text-anchor="end">30</text>
              <text x="25" y="300" font-size="11" fill="#999" text-anchor="end">0</text>
              <!-- 网格线 -->
              <line x1="35" y1="16" x2="580" y2="16" stroke="#f0f0f0" stroke-width="1"/>
              <line x1="35" y1="64" x2="580" y2="64" stroke="#f0f0f0" stroke-width="1"/>
              <line x1="35" y1="112" x2="580" y2="112" stroke="#f0f0f0" stroke-width="1"/>
              <line x1="35" y1="160" x2="580" y2="160" stroke="#f0f0f0" stroke-width="1"/>
              <line x1="35" y1="208" x2="580" y2="208" stroke="#f0f0f0" stroke-width="1"/>
              <line x1="35" y1="256" x2="580" y2="256" stroke="#f0f0f0" stroke-width="1"/>
              <line x1="35" y1="296" x2="580" y2="296" stroke="#e8e8e8" stroke-width="1"/>
              <!-- 柱状图数据 - 7组 -->
              <!-- 周一 -->
              <rect x="55" y="290" width="16" height="6" fill="#4a90d9" rx="1"/>
              <rect x="73" y="292" width="16" height="4" fill="#50b583" rx="1"/>
              <rect x="91" y="291" width="16" height="5" fill="#f5c542" rx="1"/>
              <!-- 周二 -->
              <rect x="130" y="284" width="16" height="12" fill="#4a90d9" rx="1"/>
              <rect x="148" y="288" width="16" height="8" fill="#50b583" rx="1"/>
              <rect x="166" y="286" width="16" height="10" fill="#f5c542" rx="1"/>
              <!-- 周三 -->
              <rect x="205" y="270" width="16" height="26" fill="#4a90d9" rx="1"/>
              <rect x="223" y="278" width="16" height="18" fill="#50b583" rx="1"/>
              <rect x="241" y="275" width="16" height="21" fill="#f5c542" rx="1"/>
              <!-- 周四 -->
              <rect x="280" y="262" width="16" height="34" fill="#4a90d9" rx="1"/>
              <rect x="298" y="268" width="16" height="28" fill="#50b583" rx="1"/>
              <rect x="316" y="265" width="16" height="31" fill="#f5c542" rx="1"/>
              <!-- 周五 -->
              <rect x="355" y="248" width="16" height="48" fill="#4a90d9" rx="1"/>
              <rect x="373" y="256" width="16" height="40" fill="#50b583" rx="1"/>
              <rect x="391" y="252" width="16" height="44" fill="#f5c542" rx="1"/>
              <!-- 周六 -->
              <rect x="430" y="196" width="16" height="100" fill="#4a90d9" rx="1"/>
              <rect x="448" y="210" width="16" height="86" fill="#50b583" rx="1"/>
              <rect x="466" y="204" width="16" height="92" fill="#f5c542" rx="1"/>
              <!-- 周日 -->
              <rect x="505" y="80" width="16" height="216" fill="#4a90d9" rx="1"/>
              <rect x="523" y="120" width="16" height="176" fill="#50b583" rx="1"/>
              <rect x="541" y="56" width="16" height="240" fill="#f5c542" rx="1"/>
              <!-- 折线 -->
              <polyline points="82,289 157,284 232,272 307,265 382,252 457,204 532,100" fill="none" stroke="#f5a623" stroke-width="2"/>
              <circle cx="82" cy="289" r="3" fill="#f5a623"/>
              <circle cx="157" cy="284" r="3" fill="#f5a623"/>
              <circle cx="232" cy="272" r="3" fill="#f5a623"/>
              <circle cx="307" cy="265" r="3" fill="#f5a623"/>
              <circle cx="382" cy="252" r="3" fill="#f5a623"/>
              <circle cx="457" cy="204" r="3" fill="#f5a623"/>
              <circle cx="532" cy="100" r="3" fill="#f5a623"/>
              <!-- X轴标签 -->
              <text x="82" y="314" font-size="11" fill="#999" text-anchor="middle">周一</text>
              <text x="157" y="314" font-size="11" fill="#999" text-anchor="middle">周二</text>
              <text x="232" y="314" font-size="11" fill="#999" text-anchor="middle">周三</text>
              <text x="307" y="314" font-size="11" fill="#999" text-anchor="middle">周四</text>
              <text x="382" y="314" font-size="11" fill="#999" text-anchor="middle">周五</text>
              <text x="457" y="314" font-size="11" fill="#999" text-anchor="middle">周六</text>
              <text x="532" y="314" font-size="11" fill="#999" text-anchor="middle">周日</text>
            </svg>
          </div>
        </div>
      </div>

      <!-- 右侧：配置面板 -->
      <div style="width:240px; min-width:240px; border-left:1px solid #e8e8e8; display:flex; flex-direction:column; overflow:hidden;">
        <!-- 配置/数据 Tab -->
        <div style="display:flex; border-bottom:1px solid #e8e8e8; flex-shrink:0;">
          <span class="de-cfg-tab" style="flex:1; text-align:center; padding:10px 0; font-size:13px; color:#999; cursor:pointer; border-bottom:2px solid transparent;" onclick="switchDeCfgTab(this,0)">配置</span>
          <span class="de-cfg-tab" style="flex:1; text-align:center; padding:10px 0; font-size:13px; color:#1890ff; cursor:pointer; border-bottom:2px solid #1890ff;" onclick="switchDeCfgTab(this,1)">数据</span>
        </div>

        <div style="flex:1; overflow-y:auto; padding:12px;">
          <!-- 静态/动态数据 -->
          <div style="display:flex; gap:0; margin-bottom:14px;">
            <span style="flex:1; text-align:center; padding:5px 0; font-size:12px; color:#999; border:1px solid #d9d9d9; border-radius:4px 0 0 4px; cursor:pointer;">静态数据</span>
            <span style="flex:1; text-align:center; padding:5px 0; font-size:12px; color:#1890ff; background:#e6f7ff; border:1px solid #1890ff; border-radius:0 4px 4px 0; cursor:pointer;">动态数据</span>
          </div>

          <!-- 数据集 -->
          <div style="margin-bottom:12px;">
            <div style="font-size:12px; color:#333; font-weight:500; margin-bottom:6px;">数据集</div>
            <input type="text" value="订单交付及时性趋势分析1" style="width:100%; height:28px; border:1px solid #d9d9d9; border-radius:4px; padding:0 8px; font-size:12px; outline:none; box-sizing:border-box; color:#333;" />
          </div>

          <!-- 表字段 -->
          <div style="margin-bottom:14px;">
            <div style="font-size:12px; color:#333; font-weight:500; margin-bottom:6px;">表字段</div>
            <div style="border:1px solid #e8e8e8; border-radius:4px; max-height:120px; overflow-y:auto;">
              ${fieldListHtml}
            </div>
          </div>

          <!-- X轴 -->
          <div style="margin-bottom:10px;">
            <div style="font-size:12px; color:#333; font-weight:500; margin-bottom:4px;">X轴</div>
            <div style="display:flex; align-items:center; gap:4px; padding:5px 8px; border:1px dashed #d9d9d9; border-radius:4px; color:#bbb; font-size:12px; cursor:pointer;">
              <i class="fa-solid fa-plus" style="font-size:10px;"></i> 拖入字段
            </div>
          </div>

          <!-- Y1轴 -->
          <div style="margin-bottom:10px;">
            <div style="font-size:12px; color:#333; font-weight:500; margin-bottom:4px;">Y1轴</div>
            <div style="display:flex; align-items:center; gap:4px; padding:5px 8px; border:1px dashed #d9d9d9; border-radius:4px; color:#bbb; font-size:12px; cursor:pointer;">
              <i class="fa-solid fa-plus" style="font-size:10px;"></i> 拖入字段
            </div>
          </div>

          <!-- Y2轴 -->
          <div style="margin-bottom:10px;">
            <div style="font-size:12px; color:#333; font-weight:500; margin-bottom:4px;">Y2轴</div>
            <div style="display:flex; align-items:center; gap:4px; padding:5px 8px; border:1px dashed #d9d9d9; border-radius:4px; color:#bbb; font-size:12px; cursor:pointer;">
              <i class="fa-solid fa-plus" style="font-size:10px;"></i> 拖入字段
            </div>
          </div>

          <!-- 联动方式 -->
          <div style="margin-bottom:10px;">
            <div style="font-size:12px; color:#333; font-weight:500; margin-bottom:4px;">联动方式</div>
            <select style="width:100%; height:28px; border:1px solid #d9d9d9; border-radius:4px; padding:0 8px; font-size:12px; outline:none; color:#999; background:#fff;">
              <option value="">请选择</option>
            </select>
          </div>

          <!-- 联动参数 -->
          <div style="margin-bottom:10px;">
            <div style="font-size:12px; color:#333; font-weight:500; margin-bottom:4px;">联动参数</div>
            <select style="width:100%; height:28px; border:1px solid #d9d9d9; border-radius:4px; padding:0 8px; font-size:12px; outline:none; color:#999; background:#fff;">
              <option value="">请选择</option>
            </select>
          </div>

          <!-- 触发数据 -->
          <div style="margin-bottom:10px;">
            <div style="font-size:12px; color:#333; font-weight:500; margin-bottom:4px;">触发数据</div>
            <div style="display:flex; align-items:center; gap:4px; padding:5px 8px; border:1px dashed #d9d9d9; border-radius:4px; color:#bbb; font-size:12px; cursor:pointer;">
              <i class="fa-solid fa-plus" style="font-size:10px;"></i> 拖入字段
            </div>
          </div>

          <!-- 自身下钻 -->
          <div style="display:flex; align-items:center; justify-content:space-between; margin-bottom:10px;">
            <span style="font-size:12px; color:#333; font-weight:500;">自身下钻</span>
            <div style="width:36px; height:18px; border-radius:9px; background:#d9d9d9; position:relative; cursor:pointer;" onclick="this.classList.toggle('on'); this.style.background=this.classList.contains('on')?'#1890ff':'#d9d9d9'; this.querySelector('span').style.left=this.classList.contains('on')?'19px':'1px'">
              <span style="position:absolute; top:1px; left:1px; width:16px; height:16px; border-radius:50%; background:#fff; transition:left 0.2s; box-shadow:0 1px 2px rgba(0,0,0,0.2);"></span>
            </div>
          </div>

          <!-- 数据记录 -->
          <div style="display:flex; align-items:center; justify-content:space-between; margin-bottom:10px;">
            <span style="font-size:12px; color:#333; font-weight:500;">数据记录</span>
            <div style="display:flex; align-items:center; gap:4px;">
              <span style="font-size:12px; color:#666;">Top</span>
              <input type="number" value="1000" style="width:60px; height:24px; border:1px solid #d9d9d9; border-radius:4px; text-align:center; font-size:12px; outline:none;" />
            </div>
          </div>

          <!-- 数据显示记录 -->
          <div style="display:flex; align-items:center; justify-content:space-between; margin-bottom:10px;">
            <span style="font-size:12px; color:#333; font-weight:500;">数据显示记录</span>
            <div style="display:flex; align-items:center; gap:4px;">
              <span style="font-size:12px; color:#666;">Top</span>
              <input type="number" value="1000" style="width:60px; height:24px; border:1px solid #d9d9d9; border-radius:4px; text-align:center; font-size:12px; outline:none;" />
            </div>
          </div>

          <!-- 数据更新 -->
          <div style="display:flex; align-items:center; justify-content:space-between; margin-bottom:10px;">
            <span style="font-size:12px; color:#333; font-weight:500;">数据更新</span>
            <div style="width:36px; height:18px; border-radius:9px; background:#d9d9d9; position:relative; cursor:pointer;" onclick="this.classList.toggle('on'); this.style.background=this.classList.contains('on')?'#1890ff':'#d9d9d9'; this.querySelector('span').style.left=this.classList.contains('on')?'19px':'1px'">
              <span style="position:absolute; top:1px; left:1px; width:16px; height:16px; border-radius:50%; background:#fff; transition:left 0.2s; box-shadow:0 1px 2px rgba(0,0,0,0.2);"></span>
            </div>
          </div>

          <!-- 更新时间 -->
          <div style="display:flex; align-items:center; justify-content:space-between; margin-bottom:10px;">
            <span style="font-size:12px; color:#333; font-weight:500;">更新时间(s)</span>
            <input type="number" value="10" style="width:60px; height:24px; border:1px solid #d9d9d9; border-radius:4px; text-align:center; font-size:12px; outline:none;" />
          </div>
        </div>
      </div>
    </div>
  `;
}

function switchDeCfgTab(el, idx) {
  el.parentElement.querySelectorAll('.de-cfg-tab').forEach(t => {
    t.style.color = '#999';
    t.style.borderBottom = '2px solid transparent';
  });
  el.style.color = '#1890ff';
  el.style.borderBottom = '2px solid #1890ff';
}

/* ========================================
   指标洞察列表页面
   ======================================== */

function renderIndicatorInsight() {
  const contentArea = document.getElementById('content-area');
  const bh = [45,62,38,55,70,48,60,35,52,67,42,58,50,65,40,55,72,46,63,37];

  const insightItems = [
    { name: '订单情况指标洞察', type: 'blue' },
    { name: '指标综合分析', type: 'blue' },
    { name: '生产订单完成进度(日)', type: 'mix' },
    { name: '订单完成情况（日）', type: 'green' },
  ];

  function insightSvg(type, idx) {
    const s = idx * 4;
    if (type === 'blue') {
      return `<svg viewBox="0 0 160 90" xmlns="http://www.w3.org/2000/svg">
        <rect width="160" height="90" fill="#f8fbff"/>
        ${[0,1,2,3,4,5,6,7,8,9].map(i => `<rect x="${6+i*15}" y="${90-bh[(s+i)%20]}" width="10" height="${bh[(s+i)%20]}" fill="#4a90d9" opacity="${0.7+i*0.02}" rx="1"/>`).join('')}
      </svg>`;
    } else if (type === 'mix') {
      return `<svg viewBox="0 0 160 90" xmlns="http://www.w3.org/2000/svg">
        <rect width="160" height="90" fill="#f8fbff"/>
        ${[0,1,2,3,4,5,6].map(i => `<rect x="${8+i*21}" y="${90-bh[(s+i)%20]}" width="8" height="${bh[(s+i)%20]}" fill="#4a90d9" rx="1"/>
        <rect x="${17+i*21}" y="${90-bh[(s+i+3)%20]*0.7}" width="8" height="${bh[(s+i+3)%20]*0.7}" fill="#f5a623" rx="1"/>`).join('')}
      </svg>`;
    } else {
      return `<svg viewBox="0 0 160 90" xmlns="http://www.w3.org/2000/svg">
        <rect width="160" height="90" fill="#f5fff8"/>
        ${[0,1,2,3,4,5,6,7,8,9].map(i => `<rect x="${6+i*15}" y="${90-bh[(s+i+2)%20]}" width="10" height="${bh[(s+i+2)%20]}" fill="#50b583" opacity="${0.7+i*0.02}" rx="1"/>`).join('')}
      </svg>`;
    }
  }

  const cardHtml = insightItems.map((d, i) => `
    <div style="flex:0 0 calc(20% - 14px); min-width:150px; max-width:200px; cursor:pointer; border-radius:4px; border:1px solid #e8e8e8; overflow:hidden; transition:box-shadow 0.2s;" onmouseover="this.style.boxShadow='0 2px 8px rgba(0,0,0,0.1)'" onmouseout="this.style.boxShadow='none'" onclick="openInsightEditor('${d.name}')">
      <div style="width:100%; height:80px; overflow:hidden; background:#f8fbff;">
        ${insightSvg(d.type, i)}
      </div>
      <div style="padding:6px 8px; font-size:12px; color:#333; white-space:nowrap; overflow:hidden; text-overflow:ellipsis; border-top:1px solid #f0f0f0;">${d.name}</div>
    </div>
  `).join('');

  contentArea.innerHTML = `
    <div style="display:flex; height:100%; background:#fff;">
      <!-- 左侧分类树 -->
      <div style="width:170px; min-width:170px; border-right:1px solid #e8e8e8; display:flex; flex-direction:column; overflow:hidden;">
        <div style="display:flex; align-items:center; justify-content:space-between; padding:10px 12px; border-bottom:1px solid #f0f0f0;">
          <div style="display:flex; align-items:center; gap:6px;">
            <i class="fa-solid fa-bars" style="color:#999; font-size:12px;"></i>
            <span style="font-size:13px; font-weight:500; color:#333;">指标洞察分类</span>
          </div>
          <span style="display:flex; align-items:center; justify-content:center; width:22px; height:22px; background:#1890ff; color:#fff; border-radius:3px; cursor:pointer; font-size:12px;" onclick="alert('新建分类')">
            <i class="fa-solid fa-plus"></i>
          </span>
        </div>
        <div style="padding:6px 8px;">
          <div style="position:relative;">
            <i class="fa-solid fa-search" style="position:absolute; left:8px; top:50%; transform:translateY(-50%); color:#bbb; font-size:12px;"></i>
            <input type="text" placeholder="请输入" style="width:100%; height:28px; border:1px solid #d9d9d9; border-radius:4px; padding:0 8px 0 26px; font-size:12px; outline:none; box-sizing:border-box;" />
          </div>
        </div>
        <div class="category-tree" style="flex:1; overflow-y:auto; padding:2px 0;">
          <div class="cat-node selected" style="padding-left:16px;" onclick="selectDashCatNode(this,'全部')">
            <span style="width:14px; display:inline-block;"></span>
            <i class="fa-solid fa-folder cat-icon" style="color:#1890ff; font-size:13px; margin:0 6px;"></i>
            <span style="font-size:13px;">全部</span>
          </div>
          <div class="cat-node" style="padding-left:32px;" onclick="selectDashCatNode(this,'指标体系')">
            <span style="width:14px; display:inline-block;"></span>
            <i class="fa-solid fa-folder cat-icon" style="color:#f5c542; font-size:13px; margin:0 6px;"></i>
            <span style="font-size:13px;">指标体系</span>
          </div>
        </div>
      </div>

      <!-- 右侧内容区域 -->
      <div style="flex:1; display:flex; flex-direction:column; overflow:hidden; min-width:0;">
        <!-- 面包屑 -->
        <div style="display:flex; align-items:center; gap:6px; padding:10px 16px; border-bottom:1px solid #f0f0f0;">
          <i class="fa-solid fa-folder" style="color:#f5c542; font-size:14px;"></i>
          <span style="font-size:14px; font-weight:500; color:#333;">全部</span>
        </div>

        <!-- 搜索栏 + 视图切换 -->
        <div style="display:flex; align-items:center; justify-content:space-between; padding:10px 16px;">
          <div style="display:flex; align-items:center; gap:8px;">
            <div style="position:relative; width:220px;">
              <i class="fa-solid fa-search" style="position:absolute; left:10px; top:50%; transform:translateY(-50%); color:#bbb; font-size:12px; pointer-events:none;"></i>
              <input type="text" placeholder="请输入" style="width:100%; height:30px; border:1px solid #d9d9d9; border-radius:4px; padding:0 10px 0 28px; font-size:13px; outline:none; box-sizing:border-box;" />
            </div>
            <button class="btn btn-primary btn-sm">查 询</button>
            <button class="btn btn-default btn-sm">重 置</button>
          </div>
          <div style="display:flex; align-items:center; gap:2px; border:1px solid #d9d9d9; border-radius:4px; overflow:hidden;">
            <span style="display:flex; align-items:center; justify-content:center; width:30px; height:28px; cursor:pointer; color:#1890ff; background:#e6f7ff; font-size:13px;" onclick="setKbView(this,'grid')">
              <i class="fa-solid fa-grip"></i>
            </span>
            <span style="display:flex; align-items:center; justify-content:center; width:30px; height:28px; cursor:pointer; color:#999; font-size:13px;" onclick="setKbView(this,'list')">
              <i class="fa-solid fa-bars"></i>
            </span>
          </div>
        </div>

        <!-- 卡片网格 -->
        <div style="flex:1; overflow-y:auto; padding:0 16px 16px;">
          <div style="display:flex; flex-wrap:wrap; gap:14px; align-items:flex-start;">
            <!-- 新建 -->
            <div style="flex:0 0 calc(20% - 14px); min-width:150px; max-width:200px; border:1px dashed #d9d9d9; border-radius:4px; cursor:pointer;" onclick="openInsightEditor()">
              <div style="height:96px; display:flex; flex-direction:column; align-items:center; justify-content:center; gap:6px;">
                <i class="fa-solid fa-plus" style="font-size:18px; color:#1890ff;"></i>
                <span style="font-size:12px; color:#1890ff;">新建</span>
              </div>
            </div>
            ${cardHtml}
          </div>
        </div>

        <!-- 分页 -->
        <div style="display:flex; align-items:center; justify-content:flex-end; gap:10px; padding:8px 16px; border-top:1px solid #f0f0f0; font-size:12px; color:#666; flex-shrink:0;">
          <span style="color:#999;">总共 ${insightItems.length} 条数据</span>
          <div style="display:flex; align-items:center; gap:3px;">
            <span style="display:flex; align-items:center; justify-content:center; width:26px; height:26px; border:1px solid #d9d9d9; border-radius:4px; color:#d9d9d9; cursor:not-allowed; font-size:10px;"><i class="fa-solid fa-chevron-left"></i></span>
            <span style="display:flex; align-items:center; justify-content:center; width:26px; height:26px; border:1px solid #1890ff; border-radius:4px; color:#1890ff; font-size:12px; background:#e6f7ff;">1</span>
            <span style="display:flex; align-items:center; justify-content:center; width:26px; height:26px; border:1px solid #d9d9d9; border-radius:4px; color:#666; cursor:pointer; font-size:10px;"><i class="fa-solid fa-chevron-right"></i></span>
          </div>
          <span>20 条/页</span>
        </div>
      </div>
    </div>
  `;
}

/* ========================================
   指标洞察新建/编辑页面
   ======================================== */

function openInsightEditor(name) {
  const contentArea = document.getElementById('content-area');
  const title = name || '订单情况指标洞察';

  const tableRows = [
    { date: '2022-11-02', orders: '337', finished: '1', rate: '0.2967' },
    { date: '2022-11-30', orders: '337', finished: '3', rate: '0.8902' },
    { date: '2022-12-01', orders: '337', finished: '2', rate: '0.5935' },
    { date: '2022-12-03', orders: '337', finished: '3', rate: '0.8902' },
    { date: '2022-12-06', orders: '337', finished: '3', rate: '0.8902' },
    { date: '2022-12-07', orders: '337', finished: '1', rate: '0.2967' },
    { date: '2022-12-08', orders: '337', finished: '1', rate: '0.2967' },
    { date: '2022-12-22', orders: '337', finished: '3', rate: '0.8902' },
    { date: '2022-12-27', orders: '337', finished: '2', rate: '0.5935' },
    { date: '2022-12-31', orders: '337', finished: '1', rate: '0.2967' },
  ];

  function buildDataTable(full) {
    const rows = full ? tableRows : tableRows.slice(0, 6);
    const rowsHtml = rows.map(r => `
      <tr>
        <td style="padding:10px 16px; border-bottom:1px solid #f0f0f0; font-size:13px; color:#333;">${r.date}</td>
        <td style="padding:10px 16px; border-bottom:1px solid #f0f0f0; font-size:13px; color:#333;">${r.orders}</td>
        <td style="padding:10px 16px; border-bottom:1px solid #f0f0f0; font-size:13px; color:#333;">${r.finished}</td>
        <td style="padding:10px 16px; border-bottom:1px solid #f0f0f0; font-size:13px; color:#333;">${r.rate}</td>
      </tr>`).join('');
    const total = full ? 14 : tableRows.length;
    return `
      <div style="margin-top:8px;">
        <div style="display:flex; justify-content:flex-end; gap:12px; margin-bottom:6px;">
          ${full ? '' : '<a href="#" onclick="event.preventDefault()" style="font-size:12px; color:#1890ff; text-decoration:none;"><i class="fa-solid fa-shuffle" style="margin-right:3px;"></i>切换组件</a>'}
          <a href="#" onclick="event.preventDefault()" style="font-size:12px; color:#1890ff; text-decoration:none;"><i class="fa-solid fa-download" style="margin-right:3px;"></i>下载</a>
        </div>
        <table style="width:100%; border-collapse:collapse;">
          <thead>
            <tr style="background:#fafafa;">
              <th style="padding:10px 16px; border-bottom:2px solid #e8e8e8; font-size:13px; font-weight:500; color:#666; text-align:left;">时间列</th>
              <th style="padding:10px 16px; border-bottom:2px solid #e8e8e8; font-size:13px; font-weight:500; color:#666; text-align:left;">生产订单(个)</th>
              <th style="padding:10px 16px; border-bottom:2px solid #e8e8e8; font-size:13px; font-weight:500; color:#666; text-align:left;">日完成生产订单总数</th>
              <th style="padding:10px 16px; border-bottom:2px solid #e8e8e8; font-size:13px; font-weight:500; color:#666; text-align:left;">日计划完成率(%)</th>
            </tr>
          </thead>
          <tbody>${rowsHtml}</tbody>
        </table>
        <div style="display:flex; align-items:center; justify-content:flex-end; gap:10px; padding:10px 0; font-size:12px; color:#666;">
          <span style="color:#999;">总共 ${total} 条数据</span>
          <div style="display:flex; align-items:center; gap:3px;">
            <span style="display:flex; align-items:center; justify-content:center; width:26px; height:26px; border:1px solid #d9d9d9; border-radius:4px; color:#d9d9d9; cursor:not-allowed; font-size:10px;"><i class="fa-solid fa-chevron-left"></i></span>
            <span style="display:flex; align-items:center; justify-content:center; width:26px; height:26px; border:1px solid #1890ff; border-radius:4px; color:#1890ff; font-size:12px; background:#e6f7ff;">1</span>
            <span style="display:flex; align-items:center; justify-content:center; width:26px; height:26px; border:1px solid #d9d9d9; border-radius:4px; color:#666; cursor:pointer; font-size:12px;">2</span>
            <span style="display:flex; align-items:center; justify-content:center; width:26px; height:26px; border:1px solid #d9d9d9; border-radius:4px; color:#666; cursor:pointer; font-size:10px;"><i class="fa-solid fa-chevron-right"></i></span>
          </div>
          <span>10 条/页</span>
          <span style="color:#999;">跳至</span>
          <input type="text" style="width:36px; height:24px; border:1px solid #d9d9d9; border-radius:4px; text-align:center; font-size:12px; outline:none;" />
          <span>页</span>
        </div>
      </div>`;
  }

  function buildChartSvg() {
    return `
      <div style="display:flex; justify-content:flex-end; gap:12px; margin-bottom:6px;">
        <a href="#" onclick="event.preventDefault()" style="font-size:12px; color:#1890ff; text-decoration:none;"><i class="fa-solid fa-shuffle" style="margin-right:3px;"></i>切换组件</a>
        <a href="#" onclick="event.preventDefault()" style="font-size:12px; color:#1890ff; text-decoration:none;"><i class="fa-solid fa-download" style="margin-right:3px;"></i>下载</a>
      </div>
      <div style="display:flex; align-items:center; justify-content:center; gap:16px; margin-bottom:8px; font-size:11px; color:#666;">
        <span style="display:flex; align-items:center; gap:4px;"><span style="width:16px; height:10px; background:#4a90d9; border-radius:2px; display:inline-block;"></span>生产订单</span>
        <span style="display:flex; align-items:center; gap:4px;"><span style="width:16px; height:10px; background:#73c0de; border-radius:2px; display:inline-block;"></span>日完成生产订单总数</span>
        <span style="display:flex; align-items:center; gap:4px;"><span style="width:8px; height:8px; background:#f5c542; border-radius:50%; display:inline-block;"></span>日计划完成率</span>
      </div>
      <svg viewBox="0 0 640 260" xmlns="http://www.w3.org/2000/svg" style="width:100%; height:auto;">
        <!-- Y轴左 -->
        <text x="28" y="18" font-size="10" fill="#999" text-anchor="end">350</text>
        <text x="28" y="55" font-size="10" fill="#999" text-anchor="end">300</text>
        <text x="28" y="92" font-size="10" fill="#999" text-anchor="end">250</text>
        <text x="28" y="129" font-size="10" fill="#999" text-anchor="end">200</text>
        <text x="28" y="166" font-size="10" fill="#999" text-anchor="end">150</text>
        <text x="28" y="203" font-size="10" fill="#999" text-anchor="end">100</text>
        <text x="28" y="237" font-size="10" fill="#999" text-anchor="end">50</text>
        <!-- Y轴右 -->
        <text x="615" y="18" font-size="10" fill="#999" text-anchor="start">1.2</text>
        <text x="615" y="55" font-size="10" fill="#999" text-anchor="start">1.0</text>
        <text x="615" y="92" font-size="10" fill="#999" text-anchor="start">0.8</text>
        <text x="615" y="129" font-size="10" fill="#999" text-anchor="start">0.6</text>
        <text x="615" y="166" font-size="10" fill="#999" text-anchor="start">0.4</text>
        <text x="615" y="203" font-size="10" fill="#999" text-anchor="start">0.2</text>
        <text x="615" y="237" font-size="10" fill="#999" text-anchor="start">0</text>
        <!-- 网格线 -->
        <line x1="35" y1="14" x2="608" y2="14" stroke="#f0f0f0"/>
        <line x1="35" y1="51" x2="608" y2="51" stroke="#f0f0f0"/>
        <line x1="35" y1="88" x2="608" y2="88" stroke="#f0f0f0"/>
        <line x1="35" y1="125" x2="608" y2="125" stroke="#f0f0f0"/>
        <line x1="35" y1="162" x2="608" y2="162" stroke="#f0f0f0"/>
        <line x1="35" y1="199" x2="608" y2="199" stroke="#f0f0f0"/>
        <line x1="35" y1="236" x2="608" y2="236" stroke="#e8e8e8"/>
        <!-- 柱状图: 蓝+青 成组 (10组, 代表10个日期) -->
        <rect x="48" y="22" width="18" height="214" fill="#4a90d9" rx="1"/>
        <rect x="68" y="230" width="18" height="6" fill="#73c0de" rx="1"/>
        <rect x="108" y="22" width="18" height="214" fill="#4a90d9" rx="1"/>
        <rect x="128" y="218" width="18" height="18" fill="#73c0de" rx="1"/>
        <rect x="168" y="22" width="18" height="214" fill="#4a90d9" rx="1"/>
        <rect x="188" y="224" width="18" height="12" fill="#73c0de" rx="1"/>
        <rect x="228" y="22" width="18" height="214" fill="#4a90d9" rx="1"/>
        <rect x="248" y="218" width="18" height="18" fill="#73c0de" rx="1"/>
        <rect x="288" y="22" width="18" height="214" fill="#4a90d9" rx="1"/>
        <rect x="308" y="218" width="18" height="18" fill="#73c0de" rx="1"/>
        <rect x="348" y="22" width="18" height="214" fill="#4a90d9" rx="1"/>
        <rect x="368" y="230" width="18" height="6" fill="#73c0de" rx="1"/>
        <rect x="408" y="22" width="18" height="214" fill="#4a90d9" rx="1"/>
        <rect x="428" y="230" width="18" height="6" fill="#73c0de" rx="1"/>
        <rect x="468" y="22" width="18" height="214" fill="#4a90d9" rx="1"/>
        <rect x="488" y="218" width="18" height="18" fill="#73c0de" rx="1"/>
        <rect x="528" y="22" width="18" height="214" fill="#4a90d9" rx="1"/>
        <rect x="548" y="224" width="18" height="12" fill="#73c0de" rx="1"/>
        <!-- 折线: 日计划完成率 -->
        <polyline points="67,200 127,92 187,130 247,92 307,92 367,200 427,200 487,92 547,130" fill="none" stroke="#f5c542" stroke-width="2"/>
        <circle cx="67" cy="200" r="3" fill="#fff" stroke="#f5c542" stroke-width="2"/>
        <circle cx="127" cy="92" r="3" fill="#fff" stroke="#f5c542" stroke-width="2"/>
        <circle cx="187" cy="130" r="3" fill="#fff" stroke="#f5c542" stroke-width="2"/>
        <circle cx="247" cy="92" r="3" fill="#fff" stroke="#f5c542" stroke-width="2"/>
        <circle cx="307" cy="92" r="3" fill="#fff" stroke="#f5c542" stroke-width="2"/>
        <circle cx="367" cy="200" r="3" fill="#fff" stroke="#f5c542" stroke-width="2"/>
        <circle cx="427" cy="200" r="3" fill="#fff" stroke="#f5c542" stroke-width="2"/>
        <circle cx="487" cy="92" r="3" fill="#fff" stroke="#f5c542" stroke-width="2"/>
        <circle cx="547" cy="130" r="3" fill="#fff" stroke="#f5c542" stroke-width="2"/>
        <!-- X轴标签 -->
        <text x="67" y="252" font-size="9" fill="#999" text-anchor="middle">2022-11-02</text>
        <text x="127" y="252" font-size="9" fill="#999" text-anchor="middle">2022-11-30</text>
        <text x="187" y="252" font-size="9" fill="#999" text-anchor="middle">2022-12-01</text>
        <text x="247" y="252" font-size="9" fill="#999" text-anchor="middle">2022-12-03</text>
        <text x="307" y="252" font-size="9" fill="#999" text-anchor="middle">2022-12-06</text>
        <text x="367" y="252" font-size="9" fill="#999" text-anchor="middle">2022-12-08</text>
        <text x="427" y="252" font-size="9" fill="#999" text-anchor="middle">2022-12-27</text>
        <text x="487" y="252" font-size="9" fill="#999" text-anchor="middle">2023-01-10</text>
        <text x="547" y="252" font-size="9" fill="#999" text-anchor="middle">2023-02-15</text>
      </svg>`;
  }

  function buildLeftDataTab() {
    const indicators = [
      { num: 1, name: '生产订单', color: '#1890ff' },
      { num: 2, name: '日完成生产订单总数', color: '#1890ff' },
      { num: 3, name: '日计划完成率', color: '#1890ff' },
    ];
    const indicatorHtml = indicators.map(ind => `
      <div style="display:flex; align-items:center; gap:8px; padding:8px 0;">
        <span style="display:flex; align-items:center; justify-content:center; width:20px; height:20px; background:${ind.color}; color:#fff; border-radius:50%; font-size:11px; flex-shrink:0;">${ind.num}</span>
        <select style="flex:1; height:30px; border:1px solid #d9d9d9; border-radius:4px; padding:0 8px; font-size:12px; outline:none; color:#333; background:#fff;">
          <option>${ind.name}</option>
        </select>
        <label style="display:flex; align-items:center; gap:3px; font-size:12px; color:#666; white-space:nowrap;">
          <input type="checkbox" style="margin:0;"/> 同比
        </label>
        <label style="display:flex; align-items:center; gap:3px; font-size:12px; color:#666; white-space:nowrap;">
          <input type="checkbox" style="margin:0;"/> 环比
        </label>
      </div>
    `).join('');

    return `
      <div style="padding:12px 14px; overflow-y:auto; flex:1;">
        ${indicatorHtml}
        <div style="display:flex; align-items:center; gap:8px; padding:8px 0;">
          <span style="display:flex; align-items:center; justify-content:center; width:20px; height:20px; background:#1890ff; color:#fff; border-radius:50%; font-size:11px; flex-shrink:0;">4</span>
          <span style="font-size:12px; color:#1890ff; cursor:pointer;">指标</span>
        </div>
        <div style="border-top:1px solid #f0f0f0; margin-top:8px; padding-top:10px;">
          <a href="#" onclick="event.preventDefault()" style="display:flex; align-items:center; gap:4px; font-size:12px; color:#1890ff; text-decoration:none; margin-bottom:10px;">
            <i class="fa-solid fa-plus" style="font-size:10px;"></i> 全局筛选
          </a>
          <div style="display:flex; align-items:center; gap:6px; margin-bottom:10px;">
            <span style="font-size:12px; color:#666;">按</span>
            <a href="#" onclick="event.preventDefault()" style="display:flex; align-items:center; gap:3px; font-size:12px; color:#1890ff; text-decoration:none;">
              <i class="fa-solid fa-plus" style="font-size:10px;"></i>
            </a>
            <span style="font-size:12px; color:#666;">查看</span>
          </div>
          <a href="#" onclick="event.preventDefault()" style="display:flex; align-items:center; gap:4px; font-size:12px; color:#1890ff; text-decoration:none; margin-bottom:14px;">
            <i class="fa-solid fa-plus" style="font-size:10px;"></i> 排序规则
          </a>
          <div style="border-top:1px solid #f0f0f0; padding-top:10px;">
            <div style="font-size:12px; color:#333; font-weight:500; margin-bottom:6px;">起止时间</div>
            <div style="display:flex; align-items:center; gap:4px;">
              <input type="text" placeholder="开始日期" style="flex:1; height:28px; border:1px solid #d9d9d9; border-radius:4px; padding:0 6px; font-size:11px; outline:none; color:#999; min-width:0;" />
              <span style="color:#999; font-size:12px;">→</span>
              <input type="text" placeholder="结束日期" style="flex:1; height:28px; border:1px solid #d9d9d9; border-radius:4px; padding:0 6px; font-size:11px; outline:none; color:#999; min-width:0;" />
              <i class="fa-regular fa-calendar" style="color:#999; font-size:12px; cursor:pointer;"></i>
            </div>
          </div>
        </div>
      </div>`;
  }

  function buildLeftDashboardTab() {
    return `
      <div style="overflow-y:auto; flex:1;">
        <!-- 字段列表 -->
        <div style="padding:10px 14px; border-bottom:1px solid #f0f0f0;">
          <div style="font-size:12px; font-weight:500; color:#333; margin-bottom:6px;">字段</div>
          <div style="display:flex; flex-direction:column; gap:2px;">
            <span style="font-size:12px; color:#1890ff; cursor:pointer; padding:3px 0;">+ 时间列</span>
            <span style="font-size:12px; color:#1890ff; cursor:pointer; padding:3px 0;">+ 生产订单</span>
            <span style="font-size:12px; color:#1890ff; cursor:pointer; padding:3px 0;">+ 日完成生产订单总数</span>
            <span style="font-size:12px; color:#1890ff; cursor:pointer; padding:3px 0;">+ 日计划完成率</span>
          </div>
        </div>
        <!-- 轴配置 -->
        <div style="padding:10px 14px;">
          <div style="margin-bottom:10px;">
            <div style="font-size:12px; font-weight:600; color:#333; margin-bottom:4px;">X轴</div>
            <div style="display:flex; align-items:center; gap:4px; padding:4px 8px; background:#e6f7ff; border:1px solid #91d5ff; border-radius:4px; color:#1890ff; font-size:12px;">+ 时间列</div>
          </div>
          <div style="margin-bottom:10px;">
            <div style="font-size:12px; font-weight:600; color:#333; margin-bottom:4px;">Y1轴</div>
            <div style="display:flex; flex-direction:column; gap:4px;">
              <div style="display:flex; align-items:center; gap:4px; padding:4px 8px; background:#e6f7ff; border:1px solid #91d5ff; border-radius:4px; color:#1890ff; font-size:12px;">+ 生产订单</div>
              <div style="display:flex; align-items:center; gap:4px; padding:4px 8px; background:#e6f7ff; border:1px solid #91d5ff; border-radius:4px; color:#1890ff; font-size:12px;">+ 日完成生产订单总数</div>
              <div style="display:flex; align-items:center; gap:4px; padding:4px 8px; border:1px dashed #d9d9d9; border-radius:4px; color:#bbb; font-size:12px; cursor:pointer;">+ 拖入字段</div>
            </div>
          </div>
          <div style="margin-bottom:10px;">
            <div style="font-size:12px; font-weight:600; color:#333; margin-bottom:4px;">Y2轴</div>
            <div style="display:flex; flex-direction:column; gap:4px;">
              <div style="display:flex; align-items:center; gap:4px; padding:4px 8px; background:#e6f7ff; border:1px solid #91d5ff; border-radius:4px; color:#1890ff; font-size:12px;">+ 日计划完成率</div>
              <div style="display:flex; align-items:center; gap:4px; padding:4px 8px; border:1px dashed #d9d9d9; border-radius:4px; color:#bbb; font-size:12px; cursor:pointer;">+ 拖入字段</div>
            </div>
          </div>
          <!-- 驱动方式 -->
          <div style="margin-bottom:8px;">
            <div style="font-size:12px; font-weight:500; color:#333; margin-bottom:4px;">驱动方式</div>
            <select style="width:100%; height:28px; border:1px solid #d9d9d9; border-radius:4px; padding:0 8px; font-size:12px; outline:none; color:#999; background:#fff;">
              <option value="">请选择</option>
            </select>
          </div>
          <!-- 驱动参数 -->
          <div style="margin-bottom:8px;">
            <div style="font-size:12px; font-weight:500; color:#333; margin-bottom:4px;">驱动参数</div>
            <select style="width:100%; height:28px; border:1px solid #d9d9d9; border-radius:4px; padding:0 8px; font-size:12px; outline:none; color:#999; background:#fff;">
              <option value="">请选择</option>
            </select>
          </div>
          <!-- 触发数据 -->
          <div style="margin-bottom:8px;">
            <div style="font-size:12px; font-weight:500; color:#333; margin-bottom:4px;">触发数据</div>
            <div style="display:flex; align-items:center; gap:4px; padding:4px 8px; border:1px dashed #d9d9d9; border-radius:4px; color:#bbb; font-size:12px; cursor:pointer;">+ 拖入字段</div>
          </div>
          <!-- 自身下钻 -->
          <div style="display:flex; align-items:center; justify-content:space-between; margin-bottom:8px;">
            <span style="font-size:12px; color:#333; font-weight:500;">自身下钻</span>
            <div style="width:36px; height:18px; border-radius:9px; background:#d9d9d9; position:relative; cursor:pointer;" onclick="this.classList.toggle('on'); this.style.background=this.classList.contains('on')?'#1890ff':'#d9d9d9'; this.querySelector('span').style.left=this.classList.contains('on')?'19px':'1px'">
              <span style="position:absolute; top:1px; left:1px; width:16px; height:16px; border-radius:50%; background:#fff; transition:left 0.2s; box-shadow:0 1px 2px rgba(0,0,0,0.2);"></span>
            </div>
          </div>
          <!-- 数据记录 -->
          <div style="display:flex; align-items:center; justify-content:space-between; margin-bottom:8px;">
            <span style="font-size:12px; color:#333; font-weight:500;">数据记录</span>
            <div style="display:flex; align-items:center; gap:4px;">
              <span style="font-size:12px; color:#666;">Top</span>
              <input type="number" value="1000" style="width:60px; height:24px; border:1px solid #d9d9d9; border-radius:4px; text-align:center; font-size:12px; outline:none;" />
            </div>
          </div>
          <!-- 数据显示记录 -->
          <div style="display:flex; align-items:center; justify-content:space-between; margin-bottom:8px;">
            <span style="font-size:12px; color:#333; font-weight:500;">数据显示记录</span>
            <div style="display:flex; align-items:center; gap:4px;">
              <span style="font-size:12px; color:#666;">Top</span>
              <input type="number" value="1000" style="width:60px; height:24px; border:1px solid #d9d9d9; border-radius:4px; text-align:center; font-size:12px; outline:none;" />
            </div>
          </div>
        </div>
      </div>`;
  }

  function buildLeftConfigTab() {
    return `
      <div style="overflow-y:auto; flex:1;">
        <div style="padding:8px 10px; border-bottom:1px solid #f0f0f0;">
          <div style="display:flex; align-items:center; justify-content:space-between; margin-bottom:6px;">
            <span style="font-size:13px; font-weight:500; color:#333;">代码</span>
            <div style="display:flex; gap:6px;">
              <i class="fa-solid fa-arrows-rotate" style="font-size:12px; color:#999; cursor:pointer;" title="刷新"></i>
              <i class="fa-solid fa-copy" style="font-size:12px; color:#999; cursor:pointer;" title="复制"></i>
              <i class="fa-solid fa-up-right-from-square" style="font-size:12px; color:#999; cursor:pointer;" title="导出"></i>
              <i class="fa-solid fa-circle-info" style="font-size:12px; color:#999; cursor:pointer;" title="帮助"></i>
            </div>
          </div>
          <div style="display:flex; gap:4px;">
            <i class="fa-solid fa-arrow-up" style="font-size:10px; color:#999; cursor:pointer; padding:2px;"></i>
            <i class="fa-solid fa-arrow-down" style="font-size:10px; color:#999; cursor:pointer; padding:2px;"></i>
            <div style="position:relative; flex:1;">
              <i class="fa-solid fa-search" style="position:absolute; left:6px; top:50%; transform:translateY(-50%); color:#bbb; font-size:10px;"></i>
              <input type="text" placeholder="搜索" style="width:100%; height:22px; border:1px solid #d9d9d9; border-radius:3px; padding:0 4px 0 20px; font-size:10px; outline:none; box-sizing:border-box;" />
            </div>
          </div>
        </div>
        <div style="padding:6px 10px; font-family:Consolas,'Courier New',monospace; font-size:11px; line-height:1.7; color:#333;">
          <div style="color:#999;">▼ object (8)</div>
          <div style="padding-left:12px;">
            <div><span style="color:#999;">▼</span> <span style="color:#8B4513;">title</span> (1)</div>
            <div style="padding-left:16px;"><span style="color:#666;">text</span>: <span style="color:#2a7ae2;">"..."</span></div>
            <div><span style="color:#999;">▼</span> <span style="color:#8B4513;">tooltip</span> (1)</div>
            <div style="padding-left:16px;"><span style="color:#666;">show</span>: <input type="checkbox" checked disabled style="margin:0; transform:scale(0.8);"/> <span style="color:#1890ff;">true</span></div>
            <div style="padding-left:16px;"><span style="color:#666;">trigger</span>: <span style="color:#2a7ae2;">axis</span></div>
            <div style="padding-left:16px;"><span style="color:#999;">▼</span> <span style="color:#8B4513;">axisPointer</span> (1)</div>
            <div style="padding-left:28px;"><span style="color:#666;">type</span>: <span style="color:#2a7ae2;">shadow</span></div>
            <div><span style="color:#999;">▼</span> <span style="color:#8B4513;">toolbox</span> (2)</div>
            <div style="padding-left:16px;"><span style="color:#666;">show</span>: <input type="checkbox" disabled style="margin:0; transform:scale(0.8);"/> <span style="color:#999;">false</span></div>
            <div style="padding-left:16px;"><span style="color:#999;">▼</span> <span style="color:#8B4513;">feature</span> (4)</div>
            <div style="padding-left:28px;"><span style="color:#999;">▼</span> <span style="color:#8B4513;">dataView</span> (2)</div>
            <div style="padding-left:40px;"><span style="color:#666;">show</span>: <input type="checkbox" checked disabled style="margin:0; transform:scale(0.8);"/> <span style="color:#1890ff;">true</span></div>
            <div style="padding-left:40px;"><span style="color:#666;">readOnly</span>: <input type="checkbox" disabled style="margin:0; transform:scale(0.8);"/> <span style="color:#999;">false</span></div>
            <div style="padding-left:28px;"><span style="color:#999;">▼</span> <span style="color:#8B4513;">magicType</span> (2)</div>
            <div style="padding-left:40px;"><span style="color:#666;">show</span>: <input type="checkbox" checked disabled style="margin:0; transform:scale(0.8);"/> <span style="color:#1890ff;">true</span></div>
            <div style="padding-left:40px;"><span style="color:#999;">▼</span> <span style="color:#8B4513;">type</span> [2]</div>
            <div style="padding-left:52px;"><span style="color:#999;">0</span>: <span style="color:#c41a16;">line</span></div>
            <div style="padding-left:52px;"><span style="color:#999;">1</span>: <span style="color:#c41a16;">bar</span></div>
            <div style="padding-left:28px;"><span style="color:#999;">▼</span> <span style="color:#8B4513;">restore</span> (1)</div>
            <div style="padding-left:40px;"><span style="color:#666;">show</span>: <input type="checkbox" checked disabled style="margin:0; transform:scale(0.8);"/> <span style="color:#1890ff;">true</span></div>
            <div style="padding-left:28px;"><span style="color:#999;">▼</span> <span style="color:#8B4513;">saveAsImage</span> (1)</div>
            <div style="padding-left:40px;"><span style="color:#666;">show</span>: <input type="checkbox" checked disabled style="margin:0; transform:scale(0.8);"/> <span style="color:#1890ff;">true</span></div>
            <div><span style="color:#999;">▼</span> <span style="color:#8B4513;">legend</span> (8)</div>
            <div style="padding-left:16px;"><span style="color:#666;">type</span>: <span style="color:#2a7ae2;">scroll</span></div>
            <div style="padding-left:16px;"><span style="color:#666;">itemWidth</span>: <span style="color:#1c00cf;">25</span></div>
            <div style="padding-left:16px;"><span style="color:#666;">show</span>: <input type="checkbox" checked disabled style="margin:0; transform:scale(0.8);"/> <span style="color:#1890ff;">true</span></div>
            <div style="padding-left:16px;"><span style="color:#666;">left</span>: <span style="color:#2a7ae2;">center</span></div>
            <div style="padding-left:16px;"><span style="color:#666;">top</span>: <span style="color:#2a7ae2;">auto</span></div>
          </div>
        </div>
      </div>`;
  }

  contentArea.innerHTML = `
    <div style="display:flex; height:100%; background:#fff; overflow:hidden;">
      <!-- 左侧面板 -->
      <div id="insight-left-panel" style="width:280px; min-width:280px; border-right:1px solid #e8e8e8; display:flex; flex-direction:column; overflow:hidden;">
        <!-- 三个Tab -->
        <div style="display:flex; border-bottom:1px solid #e8e8e8; flex-shrink:0;">
          <span class="insight-tab" data-tab="data" style="flex:1; text-align:center; padding:10px 0; font-size:13px; color:#1890ff; cursor:pointer; border-bottom:2px solid #1890ff;" onclick="switchInsightTab(this,'data')">数据</span>
          <span class="insight-tab" data-tab="dashboard" style="flex:1; text-align:center; padding:10px 0; font-size:13px; color:#999; cursor:pointer; border-bottom:2px solid transparent;" onclick="switchInsightTab(this,'dashboard')">仪表盘</span>
          <span class="insight-tab" data-tab="config" style="flex:1; text-align:center; padding:10px 0; font-size:13px; color:#999; cursor:pointer; border-bottom:2px solid transparent;" onclick="switchInsightTab(this,'config')">配置</span>
        </div>
        <!-- Tab内容区 -->
        <div id="insight-tab-content" style="flex:1; display:flex; flex-direction:column; overflow:hidden;">
          ${buildLeftDataTab()}
        </div>
      </div>

      <!-- 右侧预览区 -->
      <div style="flex:1; display:flex; flex-direction:column; overflow:hidden; min-width:0;">
        <!-- 标题栏 -->
        <div style="display:flex; align-items:center; justify-content:space-between; padding:10px 16px; border-bottom:1px solid #f0f0f0; flex-shrink:0;">
          <div style="display:flex; align-items:center; gap:6px;">
            <span style="font-size:14px; font-weight:500; color:#333;">${title}</span>
            <i class="fa-solid fa-pen" style="font-size:11px; color:#999; cursor:pointer;"></i>
          </div>
          <div style="display:flex; align-items:center; gap:8px;">
            <button class="btn btn-primary btn-sm">保 存</button>
            <button class="btn btn-default btn-sm" onclick="loadPage('indicator-insight')">返 回</button>
          </div>
        </div>

        <!-- 预览内容 -->
        <div id="insight-preview" style="flex:1; overflow-y:auto; padding:12px 20px;">
          ${buildDataTable(true)}
        </div>
      </div>
    </div>
  `;

  window._insightBuildChartSvg = buildChartSvg;
  window._insightBuildDataTable = buildDataTable;
  window._insightBuildLeftDataTab = buildLeftDataTab;
  window._insightBuildLeftDashboardTab = buildLeftDashboardTab;
  window._insightBuildLeftConfigTab = buildLeftConfigTab;
}

function switchInsightTab(el, tab) {
  el.parentElement.querySelectorAll('.insight-tab').forEach(t => {
    t.style.color = '#999';
    t.style.borderBottom = '2px solid transparent';
  });
  el.style.color = '#1890ff';
  el.style.borderBottom = '2px solid #1890ff';

  const tabContent = document.getElementById('insight-tab-content');
  const preview = document.getElementById('insight-preview');

  if (tab === 'data') {
    tabContent.innerHTML = window._insightBuildLeftDataTab();
    preview.innerHTML = window._insightBuildDataTable(true);
  } else if (tab === 'dashboard') {
    tabContent.innerHTML = window._insightBuildLeftDashboardTab();
    preview.innerHTML = window._insightBuildChartSvg() + window._insightBuildDataTable(false);
  } else if (tab === 'config') {
    tabContent.innerHTML = window._insightBuildLeftConfigTab();
    preview.innerHTML = window._insightBuildChartSvg() + window._insightBuildDataTable(false);
  }
}

/* ========================================
   存储配置页面
   ======================================== */

function renderSystemSettings() {
  const contentArea = document.getElementById('content-area');

  const treeData = [
    { name: '数据分析_君兰数据库', icon: 'db-group', children: [
      { name: 'dfs_metrics', icon: 'table' },
      { name: 'xianshangku', icon: 'table' },
    ]},
    { name: '输出业务层', icon: 'db-group', children: [
      { name: 'aierp_pro_test02', icon: 'db-schema', children: [
        { name: 'aierp_pro_test02', icon: 'db-table-group', children: [
          { name: 'aierp_pro_test02', icon: 'table' },
        ]},
      ]},
      { name: 'test_dm', icon: 'table', selected: true },
      { name: 'tms_demo', icon: 'table' },
    ]},
  ];

  function iconSvg(type) {
    if (type === 'db-group') {
      return '<svg viewBox="0 0 20 20" width="16" height="16"><ellipse cx="10" cy="5" rx="8" ry="3" fill="#4a90d9"/><path d="M2 5v4c0 1.7 3.6 3 8 3s8-1.3 8-3V5" fill="none" stroke="#4a90d9" stroke-width="1.2"/><path d="M2 9v4c0 1.7 3.6 3 8 3s8-1.3 8-3V9" fill="none" stroke="#4a90d9" stroke-width="1.2"/></svg>';
    } else if (type === 'db-schema') {
      return '<svg viewBox="0 0 20 20" width="16" height="16"><ellipse cx="10" cy="5" rx="7" ry="2.5" fill="#f5a623"/><path d="M3 5v4c0 1.4 3.1 2.5 7 2.5s7-1.1 7-2.5V5" fill="none" stroke="#f5a623" stroke-width="1.2"/><path d="M3 9v4c0 1.4 3.1 2.5 7 2.5s7-1.1 7-2.5V9" fill="none" stroke="#f5a623" stroke-width="1.2"/></svg>';
    } else if (type === 'db-table-group') {
      return '<svg viewBox="0 0 20 20" width="16" height="16"><rect x="2" y="3" width="16" height="14" rx="2" fill="none" stroke="#4a90d9" stroke-width="1.3"/><line x1="2" y1="7" x2="18" y2="7" stroke="#4a90d9" stroke-width="1"/><line x1="8" y1="7" x2="8" y2="17" stroke="#4a90d9" stroke-width="1"/></svg>';
    } else {
      return '<svg viewBox="0 0 20 20" width="16" height="16"><ellipse cx="10" cy="5" rx="6" ry="2" fill="#f5c542"/><path d="M4 5v4c0 1.1 2.7 2 6 2s6-.9 6-2V5" fill="none" stroke="#daa520" stroke-width="1"/><path d="M4 9v4c0 1.1 2.7 2 6 2s6-.9 6-2V9" fill="none" stroke="#daa520" stroke-width="1"/></svg>';
    }
  }

  function renderNode(node, depth) {
    const indent = depth * 20;
    const hasChildren = node.children && node.children.length > 0;
    const sel = node.selected ? 'background:#e6f7ff; border-radius:4px;' : '';
    const nameColor = node.selected ? 'color:#1890ff; font-weight:500;' : 'color:#333;';
    let html = `<div style="display:flex; align-items:center; gap:6px; padding:4px 8px; padding-left:${indent + 8}px; cursor:pointer; ${sel}" onclick="this.parentElement.querySelectorAll('[data-sel]').forEach(d=>{d.style.background='';d.removeAttribute('data-sel')}); this.style.background='#e6f7ff'; this.setAttribute('data-sel','1');">`;
    if (hasChildren) {
      html += '<i class="fa-solid fa-caret-down" style="font-size:10px; color:#999; width:12px;"></i>';
    } else {
      html += '<span style="width:12px;"></span>';
    }
    html += `<span style="display:flex; align-items:center;">${iconSvg(node.icon)}</span>`;
    html += `<span style="font-size:13px; ${nameColor}">${node.name}</span>`;
    html += '</div>';
    if (hasChildren) {
      node.children.forEach(c => { html += renderNode(c, depth + 1); });
    }
    return html;
  }

  let treeHtml = '';
  treeData.forEach(n => { treeHtml += renderNode(n, 0); });

  contentArea.innerHTML = `
    <div style="padding:30px 40px; background:#fff; height:100%; overflow-y:auto;">
      <h2 style="font-size:18px; font-weight:600; color:#333; margin:0 0 24px 0;">数据库配置：</h2>
      <div style="display:flex; align-items:flex-start; gap:12px;">
        <label style="font-size:14px; color:#333; white-space:nowrap; line-height:32px;">汇总表数据库：</label>
        <div style="width:380px;">
          <div style="position:relative; margin-bottom:4px;">
            <input type="text" value="test_dm" style="width:100%; height:32px; border:1px solid #d9d9d9; border-radius:4px; padding:0 32px 0 10px; font-size:13px; color:#333; outline:none; box-sizing:border-box;" />
            <i class="fa-solid fa-search" style="position:absolute; right:10px; top:50%; transform:translateY(-50%); color:#bbb; font-size:13px; pointer-events:none;"></i>
          </div>
          <div style="border:1px solid #e8e8e8; border-radius:4px; max-height:340px; overflow-y:auto; padding:6px 0; box-shadow:0 2px 8px rgba(0,0,0,0.08);">
            ${treeHtml}
          </div>
        </div>
      </div>
    </div>
  `;
}
