// * ////////////////////////////////////////////////////////////////////////
// *
// * FileName     [ info.js ]
// * PackageName  [ server ]
// * Synopsis     [ Get restaurant info from database ]
// * Author       [ Chin-Yi Cheng ]
// * Copyright    [ 2022 11 ]
// *
// * ////////////////////////////////////////////////////////////////////////

import Info from '../models/info'

exports.GetSearch = async (req, res) => {
    /*******    NOTE: DO NOT MODIFY   *******/
    const priceFilter = req.query.priceFilter
    const mealFilter  = req.query.mealFilter
    const typeFilter  = req.query.typeFilter
    const sortBy      = req.query.sortBy
    /****************************************/

    // NOTE Hint: 
    // use `db.collection.find({condition}).exec(err, data) {...}`
    // When success, 
    //   do `res.status(200).send({ message: 'success', contents: ... })`
    // When fail,
    //   do `res.status(403).send({ message: 'error', contents: ... })` 
    

    // TODO Part I-3-a: find the information to all restaurants
    // console.log(priceFilter, mealFilter, typeFilter, sortBy)


    if (!priceFilter && !mealFilter && !typeFilter) {
        Info.find().sort( sortBy ).exec((err, data) => {
            if (err) res.status(403).send({ message: 'error', contents: 'Fail' })
            // console.log(data)
            else res.status(200).send({ message: 'success', contents: data })
        })
        return
    }
    


    // TODO Part II-2-a: revise the route so that the result is filtered with priceFilter, mealFilter and typeFilter

    const getPrice = (price) => {
        let priceList = []
        for (let i = 0; i < price.length; i++) priceList.push(price[i].length)
        return (priceList)
    }

    const replaceUndefined = (object) => {
        if (!object) return []
        else return object
    }

    if (priceFilter && (mealFilter || typeFilter)) {
        Info.find({ 'price': {$in: getPrice(priceFilter)}, 'tag': {$in: [...replaceUndefined(mealFilter), ...replaceUndefined(typeFilter)]} }, {}).sort( sortBy ).exec((err, data) => {
            if (err) res.status(403).send({ message: 'error', contents: 'Fail' })
            else res.status(200).send({ message: 'success', contents: data })
        })
    }

    else if (!priceFilter && (mealFilter || typeFilter)) {
        Info.find({'tag': {$in: [...replaceUndefined(mealFilter), ...replaceUndefined(typeFilter)]} }, {}).sort( sortBy ).exec((err, data) => {
            if (err) res.status(403).send({ message: 'error', contents: 'Fail' })
            else res.status(200).send({ message: 'success', contents: data })
        })
    }

    else if (priceFilter && !mealFilter && !typeFilter) {
        Info.find({ 'price': {$in: getPrice(priceFilter)} }, {}).sort( sortBy ).exec((err, data) => {
            if (err) res.status(403).send({ message: 'error', contents: 'Fail' })
            else res.status(200).send({ message: 'success', contents: data })
        })
    }

    // TODO Part II-2-b: revise the route so that the result is sorted by sortBy
}

exports.GetInfo = async (req, res) => {
    /*******    NOTE: DO NOT MODIFY   *******/
    const id = req.query.id
    console.log(id)
    /****************************************/

    // NOTE USE THE FOLLOWING FORMAT. Send type should be 
    // if success:
    // {
    //    message: 'success'
    //    contents: the data to be sent. Hint: A dictionary of the restaruant's information.
    // }
    // else:
    // {
    //    message: 'error'
    //    contents: []
    // }

    // TODO Part III-2: find the information to the restaurant with the id that the user requests
    Info.find({ id: id }, {}).exec((err, data) => {
        // console.log(data)
        if (err) res.status(403).send({ message: 'error', contents: [] })
        else res.status(200).send({ message: 'success', contents: data })
    })
}