Date.prototype.format = function(format){ 
    var o =  { 
    "M+" : this.getMonth()+1, //month 
    "d+" : this.getDate(), //day 
    "h+" : this.getHours(), //hour 
    "m+" : this.getMinutes(), //minute 
    "s+" : this.getSeconds(), //second 
    "q+" : Math.floor((this.getMonth()+3)/3), //quarter 
    "S" : this.getMilliseconds() //millisecond 
    };
    if(/(y+)/.test(format)){ 
    	format = format.replace(RegExp.$1, (this.getFullYear()+"").substr(4 - RegExp.$1.length)); 
    }
    for(var k in o)  { 
	    if(new RegExp("("+ k +")").test(format)){ 
	    	format = format.replace(RegExp.$1, RegExp.$1.length==1 ? o[k] : ("00"+ o[k]).substr((""+ o[k]).length)); 
	    } 
    } 
    return format; 
};

var TT = TAOTAO = {
	// 编辑器参数
	kingEditorParams : {
		//指定上传文件参数名称  //相当于<input type="file" name="uploadFile"
		filePostName  : "uploadFile",
		//指定上传文件请求的url。
		uploadJson : '/pic/upload',
		//上传类型，分别为image、flash、media、file
		dir : "image"
	},
	// 格式化时间
	formatDateTime : function(val,row){
		var now = new Date(val);
    	return now.format("yyyy-MM-dd hh:mm:ss");
	},
	// 格式化连接
	formatUrl : function(val,row){
		if(val){
			return "<a href='"+val+"' target='_blank'>查看</a>";			
		}
		return "";
	},
	// 格式化价格
	formatPrice : function(val,row){
		return (val/1000).toFixed(2);
	},
	// 格式化商品的状态
	formatItemStatus : function formatStatus(val,row){
        if (val == 1){
            return '正常';
        } else if(val == 2){
        	return '<span style="color:red;">下架</span>';
        } else {
        	return '未知';
        }
    },
    
    init : function(data){
    	// 初始化图片上传组件
    	this.initPicUpload(data);
    	// 初始化选择类目组件
    	this.initItemCat(data);
    },
    // 初始化图片上传组件
    initPicUpload : function(data){
    	//类选择器 循环遍历 图片上传的标签<a>
    	$(".picFileUpload").each(function(i,e){
    		//转成jquery对象
    		var _ele = $(e);
    		//获取兄弟节点 标签  删除它
    		_ele.siblings("div.pics").remove();
    		//在a标签后追加 标签 <div class="pics"><ul></ul></div>
    		_ele.after('<div class="pics"><ul></ul></div>');
    		
        	//给“上传图片按钮”绑定click事件
    		//点击图片上传的按钮 触发事件 执行以下的业务逻辑
        	$(e).click(function(){
        		//获取a标签所在的form表单对象   相当于$("#itemAddForm")
        		var form = $(this).parentsUntil("form").parent("form");
        		//打开图片上传窗口
        		//加载多图片上传的插件
        		KindEditor.editor(TT.kingEditorParams).loadPlugin('multiimage',function(){
        			var editor = this;
        			editor.plugin.multiImageDialog({
        				//当点击全部插入之后触发以下的业务逻辑
						clickFn : function(urlList) {//urlList就是返回的包括URL的POJO的列表
							//定义数组
							var imgArray = [];
							
							KindEditor.each(urlList, function(i, data) {//data 遍历的数据对象（error,url）
								//添加URL到数组中
								imgArray.push(data.url);
								// 回显图片
								
								//<ul><li></li><li></li></ul>
								
								form.find(".pics ul").append("<li><a href='"+data.url+"' target='_blank'><img src='"+data.url+"' width='80' height='50' /></a></li>");
							});
							//imgArray.join(",")：遍历数组 通过“,” 拼接成String :[a.jgp,b.jgp]--->a.jpg,b.jpg
							//把分割好的字符串放入表当中的image的隐藏域中
							form.find("[name=image]").val(imgArray.join(","));
							//隐藏窗口
							editor.hideDialog();
						}
					});
        		});
        	});
    	});
    },
    
    // 初始化选择类目组件
    initItemCat : function(data){
    	
    	//获取商品类目的标签所在的类选择器 对象，循环遍历
    	$(".selectItemCat").each(function(i,e){
    		//把<a标签对象转成jquery对象
    		var _ele = $(e);
    		if(data && data.cid){
    			_ele.after("<span style='margin-left:10px;'>"+data.cid+"</span>");
    		}else{
    			//追加标签<span
    			_ele.after("<span style='margin-left:10px;'></span>");
    		}
    		//点击商品类目选择的按钮的时候，触发事件执行以下的业务逻辑
    		_ele.unbind('click').click(function(){
    			//创建一个div标签 给这个创建的div添加样式  再添加UL标签  <div><ul></ul></div>
    			$("<div>").css({padding:"5px"}).html("<ul>")
    			.window({
    				width:'500',
    			    height:"450",
    			    modal:true,
    			    closed:true,
    			    iconCls:'icon-save',
    			    title:'选择类目',
    			    //当打开窗口的时候触发以下的业务逻辑
    			    onOpen : function(){
    			    	//获取当前的窗口本身对象
    			    	var _win = this;
    			    	//在窗口下的ul标签中创建一颗树
    			    	$("ul",_win).tree({
    			    		url:'/item/cat/list',//参数就是id 
    			    		animate:true,
    			    		//点击树的节点的时候触发以下的业务逻辑
    			    		onClick : function(node){
    			    			//$(this).tree("isLeaf",node.target):两个值 一个是true ：是叶子节点  false:不是叶子节点
    			    			//判断如果被点击的节点是叶子节点，处理以下的业务
    			    			if($(this).tree("isLeaf",node.target)){
    			    				// 填写到cid中
    			    				//获取a标签的父标签:<td>下找到隐藏域名称cid 赋值给节点的id值
    			    				_ele.parent().find("[name=cid]").val(node.id);
    			    				// 将文本值显示，并设置标签(上边追加的<span)的cid属性为节点的id
    			    				//<span>电子书</span>
    			    				
    			    				_ele.next().text(node.text).attr("cid",node.id);
    			    				
    			    				//关闭窗口
    			    				$(_win).window('close');
    			    				
    			    				if(data && data.fun){
    			    					data.fun.call(this,node);
    			    				}
    			    			}
    			    		}
    			    	});
    			    },
    			    onClose : function(){//点击红叉的时候关闭窗口
    			    	$(this).window("destroy");
    			    }
    			}).window('open');
    		});
    	});
    },
    
    createEditor : function(select){
    	return KindEditor.create(select, TT.kingEditorParams);
    },
    
    /**
     * 创建一个窗口，关闭窗口后销毁该窗口对象。<br/>
     * 
     * 默认：<br/>
     * width : 80% <br/>
     * height : 80% <br/>
     * title : (空字符串) <br/>
     * 
     * 参数：<br/>
     * width : <br/>
     * height : <br/>
     * title : <br/>
     * url : 必填参数 <br/>
     * onLoad : function 加载完窗口内容后执行<br/>
     * 
     * 
     */
    createWindow : function(params){
    	$("<div>").css({padding:"5px"}).window({
    		width : params.width?params.width:"80%",
    		height : params.height?params.height:"80%",
    		modal:true,
    		title : params.title?params.title:" ",
    		href : params.url,
		    onClose : function(){
		    	$(this).window("destroy");
		    },
		    onLoad : function(){
		    	if(params.onLoad){
		    		params.onLoad.call(this);
		    	}
		    }
    	}).window("open");
    },
    
    closeCurrentWindow : function(){
    	$(".panel-tool-close").click();
    },
    
    changeItemParam : function(node,formId){
    	$.getJSON("/item/param/query/itemcatid/" + node.id,function(data){
			  if(data.status == 200 && data.data){
				 $("#"+formId+" .params").show();
				 var paramData = JSON.parse(data.data.paramData);
				 var html = "<ul>";
				 for(var i in paramData){
					 var pd = paramData[i];
					 html+="<li><table>";
					 html+="<tr><td colspan=\"2\" class=\"group\">"+pd.group+"</td></tr>";
					 
					 for(var j in pd.params){
						 var ps = pd.params[j];
						 html+="<tr><td class=\"param\"><span>"+ps+"</span>: </td><td><input autocomplete=\"off\" type=\"text\"/></td></tr>";
					 }
					 
					 html+="</li></table>";
				 }
				 html+= "</ul>";
				 $("#"+formId+" .params td").eq(1).html(html);
			  }else{
				 $("#"+formId+" .params").hide();
				 $("#"+formId+" .params td").eq(1).empty();
			  }
		  });
    },
    getSelectionsIds : function (select){
    	var list = $(select);
    	var sels = list.datagrid("getSelections");
    	var ids = [];
    	for(var i in sels){
    		ids.push(sels[i].id);
    	}
    	ids = ids.join(",");
    	return ids;
    },
    
    /**
     * 初始化单图片上传组件 <br/>
     * 选择器为：.onePicUpload <br/>
     * 上传完成后会设置input内容以及在input后面追加<img> 
     */
    initOnePicUpload : function(){
    	$(".onePicUpload").click(function(){
			var _self = $(this);
			KindEditor.editor(TT.kingEditorParams).loadPlugin('image', function() {
				this.plugin.imageDialog({
					showRemote : false,
					clickFn : function(url, title, width, height, border, align) {
						var input = _self.siblings("input");
						input.parent().find("img").remove();
						input.val(url);
						input.after("<a href='"+url+"' target='_blank'><img src='"+url+"' width='80' height='50'/></a>");
						this.hideDialog();
					}
				});
			});
		});
    }
};
