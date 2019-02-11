const ContentPage = require('./contentPage.model');

const getAll = (type)  => {
    if (type)
        return ContentPage.find({ type });
    else
        return ContentPage.find({});
};

const getById = (id) => {
    return ContentPage.findOne({ _id: id });
};

const create = (req) => {
    let contentPage = new ContentPage(req.body);
    contentPage.createdBy = req.user.username;
    return contentPage.save();
};

const update = (req) => {
    let contentPage = new ContentPage(req.body);
    
    return ContentPage.findOneAndUpdate({ _id: contentPage._id }, { $set: { 
        name: contentPage.name,
        updatedBy: req.user.username
    }}, { new: true });
};

module.exports = {
    getAll,
    getById,
    create,
    update
};