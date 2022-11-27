/* eslint-disable consistent-return */
/* eslint-disable no-unused-vars */
const slugify = require('slugify');
const { Banner } = require('../../models');
const cloudinary = require('../../utils/upload_file/cloudinary');

const { BadRequest, ServerError, Create, Response } = require('../../utils');

const createBanner = async (req, res) => {
  const { nameBanner, image } = req.body.data;
  const bannerExists = await Banner.find({ nameBanner }).exec();
  if (bannerExists.length > 0) {
    return BadRequest(res, 'Tên quảng cáo đã được tạo');
  }
  const uploadResponse = await cloudinary.uploader.upload(image, {
    folder: 'Images/Banner',
    resource_type: 'auto',
  });
  const { url } = uploadResponse;
  const bannerImage = url;
  const banner = new Banner({
    nameBanner,
    image: bannerImage,
    slug: `${slugify(nameBanner)}`,
    createdBy: req.user.userId,
  });
  // eslint-disable-next-line consistent-return
  banner.save((error, display) => {
    if (error) return ServerError(res, error);
    if (display) {
      return Create(res);
    }
  });
};

const getAllBanner = async (req, res) => {
  const allBanner = await Banner.find({}).select(
    '_id nameBanner slug image createdAt'
  );
  return Response(res, { list: allBanner });
};
module.exports = {
  createBanner,
  getAllBanner,
};
