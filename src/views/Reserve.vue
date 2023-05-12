<template>
	<div class="reserve">
		<el-steps :active="stepActive" simple finish-status="success">
			<el-step title="信息验证" />
			<el-step title="基础信息" />
			<el-step title="完成预约" />
		</el-steps>
		<el-form v-if="stepActive == 0" ref="stepForm_0" :model="login" :rules="rules" :label-width="120">
			<el-form-item label="用户名" prop="username">
				<el-input v-model="login.username" prefix-icon="User" placeholder="请输入用户名"></el-input>
				<div class="el-form-item-msg">用户名作为登录凭证</div>
			</el-form-item>
			<el-form-item label="密码" prop="password">
				<el-input v-model="login.password" prefix-icon="Lock" clearable show-password
					placeholder="请输入密码"></el-input>
				<div class="el-form-item-msg">密码作为用户名的凭证</div>
			</el-form-item>
		</el-form>
		<el-form v-if="stepActive == 1" ref="stepForm_1" :model="form" :rules="rules" :label-width="120">
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
				<el-select v-model="form.section" placeholder="请选择科室" @change="sectionSelect">
					<el-option :label="item.name" v-for="item in section" :key="item._id" :value="item.name"></el-option>
				</el-select>
				<div class="el-form-item-msg">根据自己的疾病选择对应的科室</div>
			</el-form-item>
			<el-form-item label="专家选择" prop="expert">
				<el-select v-model="form.expert" placeholder="请选择专家" @change="expertSelect">
					<el-option :label="item.name" v-for="item in expert" :key="item._id" :value="item.name"></el-option>
				</el-select>
				<div class="expert-show" v-if="isExpert">
					<el-image style="width: 100px; height: 120px" fit="fill" :src="isExpertSelect.img" />
					<el-card style="width: 75%;font-size: 12px;text-indent: 20px;height: 120px">
						<el-scrollbar height="120px">
							<div v-html="isExpertSelect.content"></div>
						</el-scrollbar>
					</el-card>
				</div>
				<div class="el-form-item-msg">根据选择的科室选择对应的专家</div>
			</el-form-item>
			<el-form-item label="日期选择" prop="date">
				<el-date-picker type="date" value-format="YYYY-MM-DD" placeholder="选择日期"
					v-model="form.date"></el-date-picker>
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
			<div class="el-form-item-msg" style="text-align: center">当前还剩预约次数：{{ count }}次</div>
			<div style="margin-top: 20px;display: flex;justify-content: center;">
				<el-button @click="pay">点击支付</el-button>
			</div>
		</el-form>
		<div v-if="(stepActive == 2)">
			<el-result icon="success" title="预约成功" sub-title="请等待来电结果">
				<template #extra>
					<el-button type="primary" @click="goIndex">前往首页</el-button>
				</template>
			</el-result>
		</div>
		<el-form style="text-align: center;">
			<el-button v-if="stepActive > 0 && stepActive < 2" @click="pre">上一步</el-button>
			<el-button v-if="stepActive < 1" type="primary" @click="next">下一步</el-button>
			<el-popover
			v-if="(count == 0)"
			placement="top-start"
			:width="200"
			trigger="hover"
			content="当前没有预约次数了，请等明天或取消预约以增加次数"
			>
			<template #reference>
				<span style="margin-left: 20px;">
					<el-button v-if="(stepActive == 1)" :disabled="(count == 0)" type="primary" @click="save">提交</el-button>
				</span>
			</template>
		</el-popover>
		<el-button v-if="(stepActive == 1 && count != 0)" :disabled="(count == 0 || isPay == false)" type="primary" @click="save">提交</el-button>
		</el-form>
	</div>
</template>
<script>
import md5 from 'js-md5'
import { cloud } from '@/utils/laf-cloud'
import { ElMessage, ElMessageBox } from 'element-plus'
export default {
	data() {
		return {
			// 步骤数
			stepActive: 0,
			// 科室的信息
			section: [],
			// 专家的信息
			expert: [],
			// 预约次数
			count: 0,
			// 选择的专家
			isExpertSelect: [],
			// 是否选择了专家
			isExpert: false,
			// 是否支付
			isPay: false,
			// 要上传的数据
			form: {
				name: "",
				sex: "",
				section: "",
				expert: "",
				date: "",
				phone: "",
				desc: "",
				success: "否"
			},
			// 登录信息
			login: {
				username: "",
				password: ""
			},
			// 验证规则
			rules: {
				name: [
					{ required: true, message: '请输入姓名', trigger: 'blur' }
				],
				sex: [
					{ required: true, message: '请选择性别', trigger: 'blur' }
				],
				section: [
					{ required: true, message: '请选择科室', trigger: 'blur' }
				],
				expert: [
					{ required: true, message: '请选择专家', trigger: 'blur' }
				],
				date: [
					{ required: true, message: '请选择日期', trigger: 'blur' }
				],
				phone: [
					{ required: true, message: '请输入电话号码', trigger: 'blur' },
					{
						pattern: /^(13[0-9]|14[01456879]|15[0-35-9]|16[2567]|17[0-8]|18[0-9]|19[0-35-9])\d{8}$/,
						message: "请输入正确的手机号码", trigger: 'blur'
					}
				],
				desc: [
					{ required: true, message: '请输入症状', trigger: 'blur' }
				],
				username: [
					{ required: true, message: '请输入账号名', trigger: 'blur' }
				],
				password: [
					{ required: true, message: '请输入密码', trigger: 'blur' }
				]
			},
		}
	},
	async created() {
		console.log(cloud)

		let db = cloud.database()

		let collection = db.collection('section')
		// 请求科室的信息
		let section = await collection.get()
		console.log(section)
		this.section = section.data

		
	},
	// 离开路由前删除本地存储
	beforeRouteLeave() {
		localStorage.removeItem("postId")
	},
	// 同理
	beforeCreate() {
		localStorage.removeItem("postId")
	},
	methods: {
		// 上一步
		pre() {
			this.stepActive -= 1
		},
		// 下一步
		async next() {
			const formName = `stepForm_${this.stepActive}`

			var validate = await this.$refs[formName].validate()
			if (!validate) { return false }

			// 获取账号密码
			let data = {
				username: this.login.username,
				password: md5(this.login.password)
			}

			var admin = await cloud.invoke('login-user', data)
			if (admin.code == 200) {
				this.stepActive += 1;
				localStorage.setItem("postId", admin.data.userInfo.userId)
				let id = localStorage.getItem("postId")
				let res = await cloud.database().collection('admins').where({
					_id: id
				}).get()
				console.log(res)
				this.count = res.data[0].count
			} else {
				this.$message.warning(admin.message)
			}
		},
		// 提交
		async save() {
			const formName = `stepForm_${this.stepActive}`

			var validate = await this.$refs[formName].validate()
			if (!validate) { return false }

			// 获取账号数据
			let data = {
				name: this.form.name,
				sex: this.form.sex,
				section: this.form.section,
				expert: this.form.expert,
				date: this.form.date,
				phone: this.form.phone,
				desc: this.form.desc,
				postid: localStorage.getItem("postId"),
				success: this.form.success
			}

			let user = await cloud.invoke('reserve', data)
			console.log(user)
			if (user.code == 200) {
				this.stepActive = 2
				this.count -= 1;
			let id = localStorage.getItem("postId")
			let res = await cloud.database().collection('admins').where({
				_id: id
			}).update({
				count: this.count
			})
			console.log(res)
			} else {
				this.$message.warning(user.message)
			}
		},
		// 获取选择科室的值
		async sectionSelect(val) {
			console.log("val",val);

			console.log(cloud)
			let db = cloud.database()

			let collection = db.collection('expert')
			// 跟据科室选择专家的信息
			let expert = await collection.where({
				section: val
			}).get()
			console.log(expert)
			this.expert = expert.data
			// 清空专家的值
			delete this.form.expert

			// 将值变为负，使专家信息隐藏
			this.isExpert = false
		},
		// 获取选择专家的值
		async expertSelect(val) {
			console.log("val",val);

			console.log(cloud)
			let db = cloud.database()

			let collection = db.collection('expert')
			// 跟据科室选择专家的信息
			let expert = await collection.where({
				name: val
			}).get()
			console.log(expert)
			this.isExpertSelect = expert.data[0]

			// 将值变为正，使专家信息展示出来
			this.isExpert = true
		},
		// 回到首页
		goIndex() {
			this.$router.push({
				path: '/home'
			})
		},
		// 支付提示
		pay() {
			ElMessageBox.confirm(
				'本次预约费用为120元（人民币）',
				'支付窗口（此为模拟支付）',
				{
				confirmButtonText: '确定',
				cancelButtonText: '取消',
				type: 'success',
				callback: (action) => {
					if (action === 'confirm'){
						this.isPay = true,
						this.$message.success('支付成功')
					}
					else {
						this.isPay = false
						this.$message.info('支付取消')
					}
				}
				}
			)
			.then(() => {
			ElMessage({
				type: 'success',
				message: '支付成功',
			})
			})
			.catch(() => {
			ElMessage({
				type: 'info',
				message: '支付取消',
			})
			})
		}
	}
}
</script>

<style lang="less" scoped>
.el-form {
	padding: 2%;
	margin: 0 auto;
	width: 50%;
}

.el-form-item-msg {
	font-size: 12px;
	color: #999;
	clear: both;
	width: 100%;
}

.expert-show {
	margin-top: 20px;
	display: flex;
    justify-content: space-between;
}
.el-menu {
	border: none !important;
}

.el-menu .el-menu-item a {
	color: inherit;
	text-decoration: none;
	display: block;
	width: 100%;
	height: 100%;
	position: absolute;
	top: 0px;
	left: 0px;
}

.el-select {
	width: 100%
}
</style>