const {DeviceService}  = require('../services/index');

const defaultResult = {
    message: 'success',
    error: null,
    status: true,
    result: null
}

const getAllDevices = async (req, res)=>{
    try {
        const data = await DeviceService.getAllDevices();
        const result = {...defaultResult, result: data};
        return res.status(200).json(result);
    } catch (error) {
        const result = {...defaultResult, error: error.message, status: false, message: 'failed'};
        return res.status(500).json(result);
    }
}

const getDeviceDetail = async (req, res)=>{
    try {
        const {id} = req.params;
        const data = await DeviceService.getDeviceDetail(id);
        if(!data) throw new Error('Not found post detail');
        const result = {...defaultResult, result: data};
        return res.status(200).json(result);
    } catch (error) {
        const result = {...defaultResult, error: error.message, status: false, message: 'failed'};
        return res.status(500).json(result);
    }
}

const postCreateDevice = async (req, res)=>{
    try {
        const body = req.body
        const data = await DeviceService.postCreateDevice(body);
        const result = {...defaultResult, result: data};
        return res.status(201).json(result);
    } catch (error) {
        const result = {...defaultResult, error: error.message, status: false, message: 'failed'};
        return res.status(500).json(result);
    }
}

const putUpdateDevice = async (req, res)=>{
    try {
        const {id} = req.params;
        const body = req.body
        const data = await DeviceService.putUpdateDevice(id, body);
        const result = {...defaultResult, result: data};
        return res.status(200).json(result);
    } catch (error) {
        const result = {...defaultResult, error: error.message, status: false, message: 'failed'};
        return res.status(500).json(result);
    }
}

const deleteAllDevices = async (req, res)=>{
    try {
        const data = await DeviceService.deleteAllDevices();
        const result = {...defaultResult, result: data};
        return res.status(200).json(result);
    } catch (error) {
        const result = {...defaultResult, error: error.message, status: false, message: 'failed'};
        return res.status(500).json(result);
    }
}

const deleteDevice = async (req, res)=>{
    try {
        const {id} = req.params;
        const data = await DeviceService.deleteDevice(id);
        if(!data) throw new Error('Not found post delete');
        const result = {...defaultResult, result: data};
        return res.status(200).json(result);
    } catch (error) {
        const result = {...defaultResult, error: error.message, status: false, message: 'failed'};
        return res.status(500).json(result);
    }
}

module.exports = {getAllDevices, getDeviceDetail, postCreateDevice, putUpdateDevice, deleteAllDevices, deleteDevice}