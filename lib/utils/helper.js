import moment from 'moment'

export const timeDiffFromDate = date => {
    return moment(date).fromNow()
}