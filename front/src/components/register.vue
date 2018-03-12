<template>
<div>
    <Modal
        v-model="modal1"
        :loading="loading"
        title="注册"
        :mask-closable = flag
        @on-ok="handleSubmit('form')"
        @on-cancel="cancel">
        <Form ref="form" :model="formCustom" :rules="rules" :label-width="80">
            <FormItem label="用户名" prop="user_name">
                <Input type="text" v-model="formCustom.user_name"></Input>
            </FormItem>
            <FormItem label="密码" prop="password">
                <Input  type="password" v-model="formCustom.password"></Input>
            </FormItem>
            <FormItem label="重复密码" prop="password2">
                <Input  type="password" v-model="formCustom.password2"></Input>
            </FormItem>
        </Form>
    </Modal>
</div>    
</template>
<script>
    export default {
        data () {
            return {
                flag : false,
                modal1: true,
                loading : true,
                formCustom: {
                    user_name : '',
                    password : '',
                    password2 : '',
                    
                },
                rules:{
                    user_name: [
                        {required:true, message: '用户名不能为空', trigger: 'blur' }
                    ],
                    password: [
                        {required:true, message: '密码不能为空', trigger: 'blur' }
                    ],
                    password2: [
                        {required:true, message: '密码不能为空', trigger: 'blur' }
                    ],
                },
            }
        },
        methods: {
            cancel () {
                this.$router.push({
                    name : 'login'
                })
            },
            handleSubmit(name) {
                let that = this;
                that.$refs[name].validate((valid) => {
                    if (valid) {
                        let postData = that.formCustom;
                        let qs = require('qs');
                        that.axios({
                            url:'/api/register',
                            method:'post',
                            data:qs.stringify(postData)
                        })
                        .then(res=>{
                            let needData = res.data;
                            if (needData.code == 200) {
                                that.$Message.success('注册成功，即将返回登陆!');
                                setTimeout(() => {
                                    that.$router.push({
                                        name : 'login'
                                    })
                                },1000)                               
                            } else {
                                that.$Message.error(needData.msg);
                                setTimeout(() => {
                                    that.loading = false;
                                    that.$nextTick(() => {
                                        that.loading = true
                                    })
                                },1000)
                            }
                        })
                        .catch(err=>{
                            that.$Message.error('网络请求异常');
                        })

                    } else {
                        that.$Message.error('表单验证失败!');
                        setTimeout(() => {
                            that.loading = false;
                            that.$nextTick(() => {
                                that.loading = true
                            })
                        },1000)
                    }
                })
            }
        }
    }
</script>
