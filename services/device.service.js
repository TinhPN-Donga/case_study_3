const {DeviceModel} = require('../models/index');

const getAllDevices = () => {
    return DeviceModel.find();
}

const getDeviceDetail = (id) =>{
    return DeviceModel.findById(id);
}

const postCreateDevice = (data) => {
    const newDevice = new DeviceModel(data);
    return newDevice.save();
}

const putUpdateDevice  = (id, data) =>{
    return DeviceModel.updateOne({_id: id}, {$set: data});
}

const deleteAllDevices = () =>{
    return DeviceModel.deleteMany();
}

const deleteDevice = (id) =>{
    return DeviceModel.findOneAndDelete({_id: id});
}

module.exports = {getAllDevices, getDeviceDetail,postCreateDevice, putUpdateDevice, deleteAllDevices, deleteDevice}