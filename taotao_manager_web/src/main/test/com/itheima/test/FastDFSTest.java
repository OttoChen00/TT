package com.itheima.test;

import org.csource.fastdfs.*;
import org.junit.Test;

/**
 * @Author
 * @Date 2017/10/31 16:49
 */
public class FastDFSTest {

    @Test
    public void test_01() throws Exception {
        ClientGlobal.init("H:\\OpenSource\\Idea_WorkSpace\\taotao_new\\taotao_parent\\taotao_manager_web\\src\\main\\resources\\resources\\fastdfs.properties");
        TrackerClient trackerClient = new TrackerClient();
        TrackerServer trackerServer = trackerClient.getConnection();
        StorageServer storageServer = null;
        StorageClient storageClient = new StorageClient(trackerServer, storageServer);
        String[] strings = storageClient.upload_file("G:\\Photo\\img02\\255.jpg", "jpg", null);
        for (String string : strings) {
            System.out.println(string);
        }
    }
}
