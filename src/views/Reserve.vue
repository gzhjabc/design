<template>
    <div class="reserve">
        <el-steps :active="stepActive" simple finish-status="success">
		    <el-step title="信息验证" />
		    <el-step title="基础信息" />
		    <el-step title="完成预约" />
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
		<el-form v-if="stepActive==1" ref="stepForm_1" :model="form" :rules="rules" :label-width="120">
            <el-form-item label="姓名" prop="name">
				<el-input v-model="form.name" placeholder="请输入姓名"></el-input>
				<div class="el-form-item-msg">输入自己的真实姓名</div>
			</el-form-item>
            <el-form-item label="性别" prop="sex">
				<el-select v-model="form.sex" placeholder="请选择自己的性别">
                    <el-option label="男" value="男"></el-option>
                    <el-option label="女" value="女"></el-option>
                </el-select>
				<div class="el-form-item-msg">选择自己的性别</div>
			</el-form-item>
			<el-form-item label="科室选择" prop="section">
				<el-select v-model="form.section" placeholder="请选择科室">
                    <el-option :label="item.name" v-for="item in section" :key="item._id" :value="item.name"></el-option>
                </el-select>
				<div class="el-form-item-msg">根据自己的疾病选择对于对应的科室</div>
			</el-form-item>
			<el-form-item label="日期选择" prop="date">
				<el-date-picker type="date" value-format="YYYY-MM-DD" placeholder="选择日期" v-model="form.date"></el-date-picker>
				<div class="el-form-item-msg">合适的时间可以让医生安排好诊断时间</div>
			</el-form-item>
            <el-form-item label="联系方式" prop="phone">
				<el-input v-model="form.phone" placeholder="请输入自己的手机号码"></el-input>
				<div class="el-form-item-msg">留下联系方式方便联系</div>
			</el-form-item>
			<el-form-item label="症状描述" prop="desc">
				<el-input type="textarea" v-model="form.desc" placeholder="请输入自己的病症情况"></el-input>
				<div class="el-form-item-msg">根据症状来快速判断何种疾病</div>
			</el-form-item>
		</el-form>
		<div v-if="(stepActive==2)">
			<el-result icon="success" title="预约成功" sub-title="请等待来电结果">
				<template #extra>
					<el-button type="primary" @click="goIndex">前往首页</el-button>
				</template>
			</el-result>
		</div>
		<el-form style="text-align: center;">
			<el-button v-if="stepActive>0 && stepActive<2" @click="pre">上一步</el-button>
			<el-button v-if="stepActive<1" type="primary" @click="next">下一步</el-button>
			<el-button v-if="(stepActive==1)" type="primary" @click="save">提交</el-button>
		</el-form>
    </div>
</template>
<script>
	import md5 from 'js-md5'
	import { cloud } from '@/utils/laf-cloud'
	export default {
    data() {
        return {
            stepActive: 0,
			section:[],
            form: {
				name: "",
				sex: "",
				section: "",
				date: "",
				phone: "",
				desc: ""
				},
			login: {
				username: "",
				password: ""
			},
			rules: {
				name: [
					{ required: true, message: '请输入姓名', trigger: 'blur'}
				],
				sex: [
					{ required: true, message: '请选择性别', trigger: 'blur'}
				],
				section: [
					{ required: true, message: '请选择科室', trigger: 'blur'}
				],
				date: [
					{ required: true, message:'请选择日期', trigger: 'blur'}
				],
				phone: [
					{ required: true, message:'请输入电话号码', trigger: 'blur' },
					{ pattern: /^(13[0-9]|14[01456879]|15[0-35-9]|16[2567]|17[0-8]|18[0-9]|19[0-35-9])\d{8}$/,
					message: "请输入正确的手机号码", trigger: 'blur' }
				],
				desc: [
					{ required: true, message:'请输入症状', trigger: 'blur' }
				],
				username: [
						{ required: true, message: '请输入账号名', trigger: 'blur'}
				],
				password: [
					{ required: true, message: '请输入密码', trigger: 'blur'}
				]
			}
        }
    },
	async created() {
			console.log(cloud)

			let db = cloud.database()

			let collection = db.collection('section')

			let section = await collection.get()
			console.log(section)
			this.section = section.data
		},
		beforeRouteLeave() {
			localStorage.removeItem("postId")
		},
		beforeCreate() {
			localStorage.removeItem("postId")
		},
		methods: {
			pre(){
				this.stepActive -= 1
			},
			async next(){
				const formName = `stepForm_${this.stepActive}`
				
				var validate = await this.$refs[formName].validate()
				if(!validate){ return false }

				// 获取账号密码
				let data = {
					username: this.login.username,
					password: md5(this.login.password)
				}

				var admin = await cloud.invoke('login-user', data)
					if(admin.code == 200){
						this.stepActive += 1;
						localStorage.setItem("postId",admin.data.userInfo.userId)
					}else{
						this.$message.warning(admin.message)
					}
			},
			async save(){
				const formName = `stepForm_${this.stepActive}`
				
				var validate = await this.$refs[formName].validate()
				if(!validate){ return false }

				// 获取账号数据
				let data = {
					name: this.form.name,
					sex: this.form.sex,
					section: this.form.section,
					date: this.form.date,
					phone: this.form.phone,
					desc: this.form.desc,
					postid: localStorage.getItem("postId")
				}

				let user = await cloud.invoke('reserve', data)
				console.log(user)
				if (user.code == 200) {
					this.stepActive = 2
				} else {
					this.$message.warning(user.message)
				}
			},
			goIndex(){
				this.$router.push({
					path: '/home'
				})
			}
	}
}
</script>

<style lang="less" scoped>
	.el-form { padding: 2%; margin: 0 auto;  width: 50%; }
	.el-form-item-msg {font-size: 12px;color: #999;clear: both;width: 100%;}
	.el-menu {border: none!important;}
	.el-menu .el-menu-item a {color: inherit;text-decoration: none;display: block;width:100%;height:100%;position: absolute;top:0px;left:0px;}
	.el-select { width:100% }
</style>