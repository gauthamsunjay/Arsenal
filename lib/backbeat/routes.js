/*
    This file contains Backbeat API routes and route details
*/

/**
 * The metrics route model.
 * @param {Object} redisKeys - The Redis keys used for Backbeat metrics
 * @param {Array} allSites - The list of replication location names
 * @return {Array} The array of route objects
 */
function routes(redisKeys, allSites) {
    return [
        // Route: /_/healthcheck
        {
            httpMethod: 'GET',
            category: 'healthcheck',
            type: 'basic',
            method: 'getHealthcheck',
            extensions: {},
        },
        // Route: /_/metrics/crr/<location>/backlog
        {
            httpMethod: 'GET',
            category: 'metrics',
            type: 'backlog',
            extensions: { crr: [...allSites, 'all'] },
            method: 'getBacklog',
            dataPoints: [redisKeys.ops, redisKeys.opsDone, redisKeys.bytes,
                redisKeys.bytesDone],
        },
        // Route: /_/metrics/crr/<location>/completions
        {
            httpMethod: 'GET',
            category: 'metrics',
            type: 'completions',
            extensions: { crr: [...allSites, 'all'] },
            method: 'getCompletions',
            dataPoints: [redisKeys.opsDone, redisKeys.bytesDone],
        },
        // Route: /_/metrics/crr/<location>/throughput
        {
            httpMethod: 'GET',
            category: 'metrics',
            type: 'throughput',
            extensions: { crr: [...allSites, 'all'] },
            method: 'getThroughput',
            dataPoints: [redisKeys.opsDone, redisKeys.bytesDone],
        },
        // Route: /_/metrics/crr/<location>/all
        {
            httpMethod: 'GET',
            category: 'metrics',
            type: 'all',
            extensions: { crr: [...allSites, 'all'] },
            method: 'getAllMetrics',
            dataPoints: [redisKeys.ops, redisKeys.opsDone, redisKeys.bytes,
                redisKeys.bytesDone],
        },
        // Route: /_/crr/failed?marker=<marker>
        {
            httpMethod: 'GET',
            type: 'all',
            extensions: { crr: ['failed'] },
            method: 'getAllFailedCRR',
        },
        // Route: /_/crr/failed/<bucket>/<key>/<versionId>
        {
            httpMethod: 'GET',
            type: 'specific',
            extensions: { crr: ['failed'] },
            method: 'getFailedCRR',
        },
        // Route: /_/crr/failed
        {
            httpMethod: 'POST',
            type: 'all',
            extensions: { crr: ['failed'] },
            method: 'retryFailedCRR',
        },
        // Route: /_/monitoring/metrics
        {
            httpMethod: 'GET',
            category: 'monitoring',
            type: 'metrics',
            extensions: {},
            method: 'monitoringHandler',
        },
        // Route: /_/crr/pause/<location>
        // Where <location> is an optional field
        {
            httpMethod: 'POST',
            type: 'pause',
            extensions: { crr: [...allSites, 'all'] },
            method: 'pauseCRRService',
        },
        // Route: /_/crr/resume/<location>
        // Route: /_/crr/resume/<location>/schedule?hours=<integer>
        // Where <location> is an optional field (defaults to "all")
        {
            httpMethod: 'POST',
            type: 'resume',
            extensions: { crr: [...allSites, 'all'] },
            method: 'resumeCRRService',
        },
        // Route: /_/crr/resume/<location>/schedule
        {
            httpMethod: 'GET',
            type: 'resume',
            extensions: { crr: [...allSites, 'all'] },
            method: 'getResumeCRRSchedule',
        },
        // Route: /_/crr/status/<location>
        // Where <location> is an optional field
        {
            httpMethod: 'GET',
            type: 'status',
            extensions: { crr: [...allSites, 'all'] },
            method: 'getCRRServiceStatus',
        },
    ];
}

module.exports = routes;
