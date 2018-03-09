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
            <FormItem label="重复密码" prop="password">
                <Input  type="password2" v-model="formCustom.password2"></Input>
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
                this.$refs[name].validate((valid) => {
                    if (valid) {
                        this.$Message.success('注册成功，即将返回登陆!');
                        setTimeout(() => {
                            this.$router.push({
                                name : 'login'
                            })
                        },1000)

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
