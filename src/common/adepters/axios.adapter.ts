/* eslint-disable prettier/prettier */
import { Injectable } from '@nestjs/common';
import { HttpAdapter } from '../interface/http-adapter.interface';
import axios, { AxiosInstance } from 'axios';
@Injectable()
export class AxiosAdapter implements HttpAdapter {
    private axios: AxiosInstance = axios;
    async get<T>(url: string): Promise<T> {
        try {
            const { data } = await this.axios.get<T>(url);
            return data
        } catch (error) {
            throw new Error('This is an Error - Check logs')
        }
    }
}
