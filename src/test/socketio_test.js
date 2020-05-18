import io from 'socket.io-client'

const socket = io('ws://localhost:4000')
socket.emit('sendMsg',{name:'abc'})
console.log('客户端发送消息',{name:'abc'})
socket.on('receiveMsg',function(data){
    console.log('客户端接收服务器消息',data)
})
