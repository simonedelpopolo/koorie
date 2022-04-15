import { default as logger } from '../logger.js'
import { resource_get_public } from '../../../index.js'
import { true_false } from 'boolean-jokes'
import { number_of_connections, request_id, worker } from '../dispatcher.js'

export const logger_log_value = {
    request_method: null,
    request_url: null,
    request_filename: null,
    error: null,
    incoming_body_payload: null,
    incoming_body_content_length: null,
    incoming_url_params: null,
    response_status_message: null,
    response_status_code: null,
    request_ip_address: null,
    response_headers: null,
    outgoing_body_content_length: null,
    outgoing_body_payload: null,
    library_message: null
}

const logSymbol = Symbol( 'Object [ koorie.logger.log ]' )
const log = Object.defineProperty( logger, logSymbol, {
    enumerable: true,
    writable: false,
    configurable: false,

    /**
     * Object [koorie.logger.log ]
     * configurable log to be printed to stdout or written on file.
     * it is imported dynamically @ Object [ koorie.routing ] just when needed.
     *
     * @returns {Promise<Object> | Object }
     */
    value: async function logger_log(){

        const socket_active = await true_false( process.env.SOCKET_ACTIVE ).catch( error => error )
        const socket_path = process.env.SOCKET_PATH
        const secure_active = await true_false( process.env.SECURE ).catch( error => error )
        const http2_active = await true_false( process.env.HTTP2 ).catch( error => error )

        return {
            request_id: request_id,
            worker: worker.id === null ? 'no-worker' : worker.id,
            date: worker.date === null ? new Date : worker.date,
            method: logger_log_value.request_method,
            filename: `${ logger_log_value.request_filename.replace( resource_get_public(), '' ) }`,
            url: logger_log_value.request_url,
            incoming: {
                body: {
                    length: logger_log_value.incoming_body_content_length,
                    payload: logger_log_value.incoming_body_payload,
                },
                url_search_params: logger_log_value.incoming_url_params
            },
            message: logger_log_value.response_status_message,
            ip: logger_log_value.request_ip_address,
            code: logger_log_value.response_status_code,
            headers: logger_log_value.response_headers,
            outgoing: {
                body:{
                    length: logger_log_value.outgoing_body_content_length,
                    payload: logger_log_value.outgoing_body_payload
                }
            },
            error: logger_log_value.error,
            library_message: logger_log_value.library_message,
            hot: process.env.HOT,
            connections_since: number_of_connections,
            ssl: secure_active,
            http2: http2_active,
            socket: {
                active: socket_active,
                path: socket_path,
            },
        }
    }
} )

export default log[ logSymbol ]
