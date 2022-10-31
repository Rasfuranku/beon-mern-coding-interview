import { FlightsModel } from '../models/flights.model'

export class FlightsService {
    async getAll() {
        return await FlightsModel.find()
    }

    async updateFlightStatus(code: string, status: string) {
        await FlightsModel.updateOne({code: code}, {status: status});
    }
}
