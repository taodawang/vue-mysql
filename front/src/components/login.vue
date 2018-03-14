<template>
<div>
    <Modal
        v-model="modal1"
        :loading="loading"
        title="登陆"
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
            <FormItem>
                <div style="text-align:right">
                    <Button type="text" @click="signUp">注册</Button>
                </div>
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
                },
                rules:{
                    user_name: [
                        {required:true, message: '用户名不能为空', trigger: 'blur' }
                    ],
                    password: [
                        {required:true, message: '密码不能为空', trigger: 'blur' }
                    ],
                },
            }
        },
        methods: {
            cancel () {
                this.$Message.info('Clicked cancel');
            },
            signUp() {
                this.$router.push({
                    name : 'register',
                })
            },
            handleSubmit(name) {
                let that = this;
                this.$refs[name].validate((valid) => {
                    if (valid) {
                        let qs = require('qs')
                        that.axios({
                            url:'/api/login',
                            method:'post',
                            data:qs.stringify(Object.assign({},that.formCustom))
                            //params : that.formCustom
                        })
                        .then(res=>{
                            let needData = res.data;
                            if (needData.code == 200) {
                                that.$Message.success(needData.msg)
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
                            this.$Message.error('网络请求异常');
                            setTimeout(() => {
                                that.loading = false;
                                that.$nextTick(() => {
                                    that.loading = true
                                })
                            },1000)
                        })
                    } else {
                        this.$Message.error('表单验证失败!');
                        setTimeout(() => {
                            this.loading = false;
                            this.$nextTick(() => {
                                this.loading = true
                            })
                        },1000)
                    }
                })
            }
        }
    }
</script>
