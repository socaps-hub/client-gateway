import { Inject, Injectable } from '@nestjs/common';
import { ClientProxy } from '@nestjs/microservices';
import { NATS_SERVICE } from 'src/config';
import { ActivityLogFilterInput } from './dto/inputs/activity-log-filter.input';
import { activityLogPatterns } from 'src/common/constants/activity-log/activityLogPatterns';

@Injectable()
export class ActivityLogService {

    constructor(
        @Inject(NATS_SERVICE) private readonly client: ClientProxy,
    ) {}

    public getActivityLogsFiltrado( input: ActivityLogFilterInput ) {
        return this.client.send( activityLogPatterns.GET_ACTIVITY_LOGS_FILTRADOS, { input } )
    }

    public getActivityLogById( id: string ) {
        return this.client.send( activityLogPatterns.GET_ACTIVITY_LOG_BY_ID, { id } )
    }

}
