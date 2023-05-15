import instance from '../../instance'

const addCampaign = async (campaignDetails: {
  title: string
  description: string
  image: any
}) => {
  const resp = await instance.post('/campaign/add', campaignDetails, {
    headers: { 'content-type': 'multipart/form-data' },
  })
  return resp
}

export default addCampaign
