
jQuery.fn.femanagerValidation=function(e){function a(a){d=new m({numRequest:a.find("*[data-validation]").length,element:a}),a.find("*[data-validation]").each(function(){n(e(this),!0)})}function n(a,n){if(a.prop("disabled"))return void(n&&d.addCallbackToQueue(!0));var o=a.closest("form"),c=o.find("div:first").find('input[name="tx_femanager_pi1[user][__identity]"]').val(),p=o.find("div:first").find('input[name="tx_femanager_pi1[__referrer][@action]"]').val(),m=Femanager.getBaseUrl()+"?id="+e("#femanagerPid").val()+"&type=1548935210",v=s(a),g=a.val();"checkbox"==a.prop("type")&&0==a.prop("checked")&&(g="");var h="";if(l(v,"sameAs")){var _=l(v,"sameAs"),b=f(_),x=e('input[name="tx_femanager_pi1[user]['+b+']"]');h=x.val(),"checkbox"==x.prop("type")&&0==x.prop("checked")&&(h="")}e.ajax({url:m,data:{"tx_femanager_pi1[validation]":a.attr("data-validation"),"tx_femanager_pi1[value]":g,"tx_femanager_pi1[field]":t(a),"tx_femanager_pi1[user]":void 0!==c?c:"","tx_femanager_pi1[additionalValue]":h?h:"","tx_femanager_pi1[plugin]":o.data("femanager-plugin"),"tx_femanager_pi1[referrerAction]":p,storagePid:e("#femanagerStoragePid").val(),L:e("#femanagerLanguage").val(),id:e("#femanagerPid").val()},type:"POST",cache:!1,success:function(e){if(n&&d.addCallbackToQueue(!0),e)try{e.validate?i(a):r(a,e.message)}catch(t){a.before(data)}},error:function(){u()}})}function t(e){var a="",n=e.prop("name").split("[");return a=void 0!==n[2]?n[2].replace("]",""):n[1].replace("]","")}function r(a,n){i(a);var t=e(".femanager_validation_container").html().replace("###messages###",n);a.before(t),a.closest(".form-group").addClass("has-error"),a.addClass("error")}function i(e){e.closest(".form-group").removeClass("has-error"),e.siblings(".alert").remove(),e.removeClass("error")}function o(a){0==a.find(".error").length?(p=!0,a.submit()):e("html,body").animate({scrollTop:a.find(".error:first").offset().top})}function l(e,a){for(var n=0;n<e.length;n++)if(e[n].indexOf(a)!==-1)return e[n];return""}function s(e){return e.attr("data-validation").split(",")}function f(e){var a="";if(e.indexOf("(")!==-1){var n=e.split("(");a=n[1].substr(0,n[1].length-1)}return a}function u(){"object"==typeof console&&console.log("Error: The called url is not available - if you use TYPO3 in a subfolder, please use config.baseURL in TypoScript")}var d,c=e(this),p=!1;0==c.find("*[data-validation]").length&&(p=!0);var m=function(){var a,n,t;return function(r){r||(r={}),a=r.numRequest||0,n=r.requestsCompleted||0,c=r.element||0,t=[];var i=function(){e("body").css("cursor","default"),o(c);for(var a=0;a<t.length;a++)t[a]()};r.singleCallback&&t.push(r.singleCallback),this.addCallbackToQueue=function(e,r){e&&n++,r&&t.push(r),n==a&&i()},this.requestComplete=function(e){e&&n++,n==a&&i()},this.setCallback=function(e){t.push(callBack)}}}();e("*[data-validation]").blur(function(){n(e(this),!1)}),c.submit(function(n){e("body").css("cursor","wait"),p||(n.preventDefault(),a(e(this)))})};
function createUploader(e){if(0!=e("#femanager_field_fine-uploader").length){var a={imageNames:{},getImageNames:function(){return e.map(this.imageNames,function(e){return e}).join(",")},addImageName:function(a,t){this.imageNames[a]=t,e("#femanager_field_image").val(this.getImageNames())},deleteImageName:function(a){delete this.imageNames[a],e("#femanager_field_image").val(this.getImageNames())}};new qq.FineUploader({element:document.getElementById("femanager_field_fine-uploader"),request:{endpoint:Femanager.getBaseUrl()+"index.php?eID=femanagerFileUpload&id="+e("#femanagerPid").val(),customHeaders:{Accept:"application/json"}},multiple:!0,template:e(".image_container_template:first").html(),fileTemplate:'<li><div class="qq-progress-bar"></div><span class="qq-upload-spinner"></span><span class="qq-upload-finished"></span><span class="qq-upload-file"></span><span class="qq-upload-size"></span><a class="qq-upload-cancel" href="#">{cancelButtonText}</a><a class="qq-upload-retry" href="#">{retryButtonText}</a><a class="qq-upload-delete icon-trash" href="#">{deleteButtonText}</a><span class="qq-upload-status-text">{statusText}</span></li>',deleteFile:{enabled:!0,forceConfirm:!0,endpoint:Femanager.getBaseUrl()+"index.php?eID=femanagerFileDelete&id="+e("#femanagerPid").val()},classes:{success:"alert alert-success",fail:"alert alert-error"},validation:{allowedExtensions:getValueFromField("#uploadFileExtension","jpeg, jpg, gif, png, bmp","array"),sizeLimit:getValueFromField("#uploadSize",25e6,"int"),itemLimit:getValueFromField("#uploadAmount",1,"int")},callbacks:{onComplete:function(t,n,i){if(i.success){var l=e("<img />").addClass("fileupload_image").prop("src",e("#uploadFolder").val()+"/"+i.uploadName).prop("alt",i.uploadName);l.appendTo(this.getItemByFileId(t)),a.addImageName(t,i.uploadName)}},onDeleteComplete:function(e,t,n){a.deleteImageName(e)}}});return a}}function getValueFromField(e,a,t){var n=a;return $(e).length&&(n=$(e).val()),void 0!==t&&("int"===t?n=parseInt(n):"array"===t&&(n=n.toString(),n=n.replace(/[\s,]+/g,","),n=n.split(","))),n}jQuery(document).ready(function(e){function a(e){e+="";var a=e.charAt(0).toLowerCase();return a+e.substr(1)}var t;t=null!=document.querySelector(".tx-femanager[data-labels]")?JSON.parse(document.querySelector(".tx-femanager[data-labels]").dataset.labels):[],e(".feManagerValidation").femanagerValidation(e);var n=createUploader(e);e("#femanager_field_image").length>0&&e.each(e("#femanager_field_image").val().split(","),function(e,a){a.trim().length>0&&n.addImageName(a,a)}),e("#femanager_field_preview-image").find(".qq-upload-delete").click(function(a){a.preventDefault();var t=e(a.target).parent();n.deleteImageName(t.find(".qq-upload-file").text()),t.fadeOut("",function(){e(this).remove()})}),e("*[data-confirm]").click(function(a){var t=e(this).attr("data-confirm");confirm(t)||a.preventDefault()}),document.querySelectorAll("[data-data-endpoint]").forEach(function(n){var i=function(i){var l=n.dataset.dataEndpoint,o={"tx_femanager_pi1[action]":l,"tx_femanager_pi1[controller]":"Data"};arguments=JSON.parse(JSON.stringify(n.dataset));for(var r in arguments)if(arguments.hasOwnProperty(r)&&r.match("arguments")){var s=document.getElementById(arguments[r]);if(s){var d=a(r.substr(9));o["tx_femanager_pi1["+d+"]"]=s.value}}var p=Femanager.getBaseUrl()+"index.php?id="+e("#femanagerPid").val()+"&type=1594138042",m=n.dataset.selectedValue;e.ajax({url:p,data:o,type:"POST",cache:!1,beforeSend:function(){n.disabled=1,n.options.length=0,n.options[0]=new Option(t.loading_states)},success:function(e){n.disabled=1,n.options.length=0,""===m||e.hasOwnProperty(m)||(n.options[n.options.length]=new Option(t.please_choose));for(var a in e)if(e.hasOwnProperty(a)){var i=a===m;n.options[n.options.length]=new Option(e[a],a,i,i),n.disabled=0}},error:function(){console.log("Error: The called url is not available - if you use TYPO3 in a subfolder, please use config.baseURL in TypoScript")}})},l=n.dataset.triggerFields;void 0!==l?l.split(",").forEach(function(e){var a=document.getElementById(e);void 0!==a&&a.addEventListener("change",i)}):n.addEventListener("change",i),i()})}),window.Femanager={},window.Femanager.getBaseUrl=function(){var e;if(jQuery("base").length>0)e=jQuery("base").prop("href");else if(window.location.hostname.indexOf("localhost")!==-1)e="";else{var a="";window.location.port.length>0&&(a=":"+window.location.port),e="https:"!==window.location.protocol?"http://"+window.location.hostname+a+"/":"https://"+window.location.hostname+a+"/"}return e};