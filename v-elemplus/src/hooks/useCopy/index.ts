import { ElMessage } from 'element-plus'; 
// 复制文本
export const useCopy = (text: string) => {
    // // 创建输入框
    // let input = document.createElement('input');
    // // 给输入框value赋值
    // input.value = text;
    // // 追加到body里面去
    // document.body.appendChild(input);
    // // 输入框的选择操作
    // input.select();
    // // 执行复制操作
    // document.execCommand('copy');
    // // 删除加入的输入框
    // document.body.removeChild(input);
    // // 提示用户
    // ElMessage.success('复制成功');

    // 实现复制功能
    navigator.clipboard.writeText(text).then(() => {
        ElMessage.success('复制成功');
    });
}