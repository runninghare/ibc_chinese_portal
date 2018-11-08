import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Platform } from 'ionic-angular';
import { File, Entry } from '@ionic-native/file';
import { FileTransfer } from '@ionic-native/file-transfer';
// import { FileTransfer, FileUploadOptions, FileTransferObject } from '@ionic-native/file-transfer';
import { Base64 } from '@ionic-native/base64';
import { CommonProvider } from '../../providers/common/common';
import { LoadTrackerProvider } from '../../providers/load-tracker/load-tracker';
import { DomSanitizer } from '@angular/platform-browser'

export interface IntFileCache {
    target?: string;
    filename?: string;
    timestamp?: Date;
}

/*
  Generated class for the FileCacheProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class FileCacheProvider {

    public cachingMap: { [index: string]: IntFileCache } = {};

    constructor(public http: HttpClient, public fileTransfer: FileTransfer, public sanitizer: DomSanitizer, public platform: Platform,
        public file: File, public commonSvc: CommonProvider, public loadTrackerSvc: LoadTrackerProvider, public base64Svc: Base64) {
    }

    cacheFile(s: string, type?: string): Promise<string> {

        if (!s) return null;

        if (this.commonSvc.isWeb) {
            this.cachingMap[s] = {target: s, timestamp: new Date};
            return new Promise((resolve, reject) => {
                resolve(s);
            });
        }

        if (this.cachingMap[s]) {
            // console.log(`=== Reading from cache: ${JSON.stringify(this.cachingMap[s])}`);
            return new Promise((resolve, reject) => {
                resolve(this.cachingMap[s].target);
            });
        }

        let targetFile = this.getTargetFileFromSource(s);

        return this.file.resolveLocalFilesystemUrl(targetFile)
            .then(entry => {
                // console.log(`====== Read existing file: ${entry.toInternalURL()}`);
                return this.createCache(s, entry, type);
            })
            .catch(err => {
                return this.downloadFile(s, targetFile, type);
            })
    }

    downloadFile(source, target, type?: string): Promise<string> {
        let fileTransfer = this.fileTransfer.create();

        console.log(`--- building new cache for ${source}`);

        // this.file.resolveLocalFilesystemUrl(this.file.cacheDirectory+'tempFile.pdf').then(entry => {
        //     console.log("===== cdv path of tempFile.pdf =====");
        //     console.log(entry.toInternalURL());
        // }, err => {
        //     console.log("==== error of tempFile.pdf loading ===");
        //     console.log(err);
        // })

        this.loadTrackerSvc.loading = true;

        return fileTransfer.download(source, target).then(entry => {
            this.loadTrackerSvc.loading = false;
            return this.createCache(source, entry, type);
        }).catch(err => {
            console.log('------ Error during file download --------');
            console.error(JSON.stringify(err));
            this.loadTrackerSvc.loading = false;
            return null;
        })
    }

    createCache(source: string, entry: Entry, type?: string): Promise<string> {
        return new Promise((resolve, reject) => {
            if (type == 'image' && this.platform.is('ios')) {
                let normalizedFileName = entry.nativeURL.split('/').pop();
                let path = entry.nativeURL.substring(0, entry.nativeURL.lastIndexOf("/") + 1);
                
                // Android supports cdvfile:// path, however iOS doesn't
                // We can only use base64 encoded image for iOS, however readAsDataURL doesn't work for android, which
                // means we can't encode a base64 string from given URL

                // console.log(`-------- path = ${path}`);
                // console.log(`-------- file = ${normalizedFileName}`);                
                // console.log(`${JSON.stringify(entry)}`);
                // console.log(`${entry.toInternalURL()}`);

                this.file.readAsDataURL(path, normalizedFileName)
                    .then(base64File => {
                        entry.getMetadata(meta => {
                            this.cachingMap[source] = {
                                target: base64File,
                                timestamp: meta.modificationTime
                            };
                            resolve(base64File);
                        });
                    })
                    .catch(err => {
                        reject(err);
                    })
            } else {
                entry.getMetadata(meta => {
                    this.cachingMap[source] = {
                        target: entry.toInternalURL(),
                        timestamp: meta.modificationTime
                    };
                    // if (this.platform.is('android')) {
                    //     resolve(entry.nativeURL);
                    // } else {
                        resolve(entry.toInternalURL());
                    // }
                });
            }
        });
    }

    getTargetFileFromSource(sourceUrl: string): string {
        let ext = '';
        let matches = sourceUrl.match(/.*([.]\w+)$/);
        if (matches) {
            ext = matches[1];
        }
        let cacheRoot = this.platform.is('ios') ? this.file.cacheDirectory : this.file.externalCacheDirectory;

        let hashCode = btoa(sourceUrl);
        return cacheRoot + '/ibc/' + hashCode + ext;
    }

    checkAndClearCache(url: string, timestamp: Date) {
        console.log("-------- check and clear cache -----------");

        if (this.commonSvc.isWeb) {
            return;
        }

        let targetFile = this.getTargetFileFromSource(url);

        /* Empty the cache of this url */
        this.cachingMap[url] = undefined;

        /* Remove existing cache file */
        this.file.resolveLocalFilesystemUrl(targetFile)
            .then(entry => {
                entry.getMetadata(meta => {
                    // console.log(`--- targetFile: ${targetFile} ---`);
                    // console.log(`old time: ${meta.modificationTime}`);
                    // console.log(`new time: ${timestamp}`);
                    if (meta.modificationTime.getTime() < timestamp.getTime()) {
                        console.log(`====== URL cache outofdate! Cleaning URL: ${entry.nativeURL}`);
                        let normalizedFileName = entry.nativeURL.split('/').pop();
                        let path = entry.nativeURL.substring(0, entry.nativeURL.lastIndexOf("/") + 1);
                        this.file.removeFile(path, normalizedFileName).then(res => {
                            console.log('==== Cache file removed! ===');
                            console.log(JSON.stringify(res));
                        }, err => {
                            console.error("=== Can't remove file ===");
                            console.error(JSON.stringify(err, null, 2));
                        });
                    }
                }, failure => {
                    console.error('--- failed to get meta data ---');
                    console.error(JSON.stringify(failure, null, 2));
                })
                return entry.nativeURL;
            })
            .catch(err => console.error);

    }

}
