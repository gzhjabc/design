<template>
    <div class="query">
        <el-steps :active="stepActive" simple finish-status="success">
		    <el-step title="信息验证" />
		    <el-step title="查询信息展示" />
		</el-steps>
		<el-form v-if="stepActive==0" ref="stepForm_0" :model="login" :rules="rules" :label-width="120">
            <el-form-item label="用户名" prop="username">
				<el-input v-model="login.username" prefix-icon="User" placeholder="请输入用户名"></el-input>
				<div class="el-form-item-msg">用户名作为登录凭证</div>
			</el-form-item>
            <el-form-item label="密码" prop="password">
				<el-input v-model="login.password" prefix-icon="Lock" clearable show-password placeholder="请输入密码"></el-input>
				<div class="el-form-item-msg">密码作为用户名的凭证</div>
			</el-form-item>
		</el-form>
		<div v-if="(stepActive==1)">
			<el-result icon="success" title="查询结果：">
				<template #extra>
					<el-table :data="reserve" border stripe  style="width: 100%">
						<el-table-column prop="name" label="姓名" width="100" align="center" header-align="center" />
						<el-table-column prop="sex" label="性别" width="100" align="center" header-align="center" />
						<el-table-column prop="section" label="科室" width="100" align="center" header-align="center" />
						<el-table-column label="预约时间" width="120" align="center" header-align="center">
							<template #default="scope">
								<div>
									{{ scope.row.date  }}
								</div>
							</template>   
						</el-table-column>
						<el-table-column prop="phone" label="手机号码" width="120" align="center" header-align="center" />
						<el-table-column prop="desc" label="症状描述" align="center" header-align="center" width="300" />
					</el-table>
					<el-button style="margin-top:20px;" type="primary" @click="goIndex">前往首页</el-button>
				</template>
			</el-result>
		</div>
		<el-form style="text-align: center;">
			<el-button v-if="(stepActive==0)" type="primary" @click="save">提交</el-button>
		</el-form>
    </div>
</template>
<script>
    import md5 from 'js-md5'
	import { cloud } from '@/utils/laf-cloud'
    export default {
        data() {
            return {
				// 步骤数
                stepActive: 0,
				// 要查询的信息
                reserve: [],
				// 登录信息
                login: {
                    username: "",
                    password: ""
			    },
				// 验证规则
                rules: {
                    username: [
						{ required: true, message: '请输入账号名', trigger: 'blur'}
                    ],
                    password: [
                        { required: true, message: '请输入密码', trigger: 'blur'}
                    ]
                }
            }
        },
        methods: {
			// 提交方法
            async save(){
				const formName = `stepForm_${this.stepActive}`
				
				var validate = await this.$refs[formName].validate()
				if(!validate){ return false }

				// 获取账号密码
				let data = {
					username: this.login.username,
					password: md5(this.login.password)
				}

				// 登录
				var admin = await cloud.invoke('login-user', data)
					if(admin.code == 200){
						this.stepActive = 1;
						localStorage.setItem("postId",admin.data.userInfo.userId)
						let id = localStorage.getItem("postId")

						console.log(cloud)
						console.log(id)
						let res = await cloud.database().collection('reserve').where({
							postid: id
						}).get()
						this.reserve = res.data
						console.log(res)
					}else{
						this.$message.warning(admin.message)
					}
			},
			// 返回首页
			goIndex(){
				this.$router.push({
					path: '/home'
				})
			}
        },
		// 离开路由之前删除本地存储
		beforeRouteLeave() {
			localStorage.removeItem("postId")
		},
		// 同理
		beforeCreate() {
			localStorage.removeItem("postId")
		}
    }
</script>
<style lang="less" scoped>
    .el-form { padding: 2%; margin: 0 auto;  width: 50%; }
	.el-form-item-msg {font-size: 12px;color: #999;clear: both;width: 100%;}
	.el-menu {border: none!important;}
	.el-menu .el-menu-item a {color: inherit;text-decoration: none;display: block;width:100%;height:100%;position: absolute;top:0px;left:0px;}
</style>