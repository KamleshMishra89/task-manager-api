const mongoose = require('mongoose')

mongoose.connect(process.env.MONGODB_URL, {
    useNewUrlParser: true,
    useCreateIndex: true
})




// const me = new User({
//     name: '       Hari om  ',
//     email: 'kamlesh.cmpn@gmail.com',
//     password: ' secure123'
// })

// me.save().then(() => {
//     console.log(me)
// }).catch((error) => {
//     console.log('Error!', error)
// })




// const task = new Tasks({
//    description: '     AWS      ',
// })

// task.save().then(() => {
// console.log(task)
// }).catch((error) => {
// console.log(error)
// })
