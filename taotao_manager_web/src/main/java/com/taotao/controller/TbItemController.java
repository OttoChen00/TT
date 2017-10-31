package com.taotao.controller;

import com.taotao.common.pojo.EasyUIDataGridResult;
import com.taotao.common.utils.JsonUtils;
import com.taotao.service.TbItemService;
import com.taotao.utils.FastDFSClient;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.MediaType;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.multipart.MultipartFile;

import java.util.HashMap;
import java.util.Map;

/**
 * @Author
 * @Date 2017/10/29 17:37
 */
@Controller
public class TbItemController {

    @Value("${storage_server_path}")
    private String storage_server_path;

    @SuppressWarnings("SpringJavaAutowiringInspection")
    @Autowired
    private TbItemService tbItemService;

    @RequestMapping("/{page}")
    public String pageUI(@PathVariable String page){
        return page;
    }

    @RequestMapping(value = "/item/list",method = RequestMethod.GET)
    @ResponseBody
    public EasyUIDataGridResult list(Integer page,Integer rows){
        return tbItemService.list(page,rows);
    }

    @RequestMapping(value="/pic/upload",produces = MediaType.TEXT_PLAIN_VALUE+";charset=utf-8")
    @ResponseBody
    public String picUpload(MultipartFile uploadFile){
        String originalFilename = uploadFile.getOriginalFilename();
        String ext = originalFilename.substring(originalFilename.lastIndexOf(".") + 1);

        try {
            FastDFSClient fastDFSClient = new FastDFSClient("classpath:resources/fastdfs.properties");
            String url = fastDFSClient.uploadFile(uploadFile.getBytes(), ext, null);
            String path = storage_server_path + url;
            Map<String,Object> map = new HashMap<>();
            map.put("error",0);
            map.put("url",path);
            String json = JsonUtils.objectToJson(map);
            return json;
        } catch (Exception e) {
            e.printStackTrace();
            Map<String,Object> map = new HashMap<>();
            map.put("error",1);
            map.put("massage","上传失败");
            String json = JsonUtils.objectToJson(map);
            return json;
        }
    }
}
