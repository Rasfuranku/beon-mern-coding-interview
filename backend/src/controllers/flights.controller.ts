import { JsonController, Get, Put, Body } from 'routing-controllers'
import { FlightsService } from '../services/flights.service'

const flightsService = new FlightsService();

@JsonController('/flights', { transformResponse: false })
export default class FlightsController {
    @Get('')
    async getAll() {
        return {
            status: 200,
            data: await flightsService.getAll(),
        }
    }

    @Put('')
    async updateFlightStatus(@Body() body: any) {
        const { code, status } = body.data;        

        await flightsService.updateFlightStatus(code, status);
        return {
            status: 200
        };
    }
}
