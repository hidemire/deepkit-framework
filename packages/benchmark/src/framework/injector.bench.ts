/*
 * Deepkit Framework
 * Copyright (C) 2020 Deepkit UG
 *
 * This program is free software: you can redistribute it and/or modify
 * it under the terms of the GNU Affero General Public License as published by
 * the Free Software Foundation, either version 3 of the License, or
 * (at your option) any later version.
 *
 * This program is distributed in the hope that it will be useful,
 * but WITHOUT ANY WARRANTY; without even the implied warranty of
 * MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
 * GNU Affero General Public License for more details.
 *
 * You should have received a copy of the GNU Affero General Public License
 * along with this program.  If not, see <http://www.gnu.org/licenses/>.
 */

import 'reflect-metadata';
import { injectable, Injector, InjectorContext } from '@deepkit/framework';
import { BenchSuite } from '../bench';

export async function main() {
    class Database { }

    class Database2 { }

    @injectable()
    class MyService {
        constructor(database: Database) {
        }
    }

    const root = new Injector([MyService, Database, Database2]);
    const child = new Injector([], [root]);

    const bench = new BenchSuite('injector');

    const CircularDetector = new Set();
    const array: any[] = [];

    // bench.addAsync('circular check array', async () => {
    //     array.push(Database);
    //     array.push(Database);
    //     array.indexOf(Database);
    //     array.indexOf(MyService);
    //     array.pop();
    //     array.pop();
    // });
    //
    // bench.addAsync('circular check set', async () => {
    //     CircularDetector.add(Database);
    //     CircularDetector.add(MyService);
    //     CircularDetector.has(Database);
    //     CircularDetector.has(MyService);
    //     CircularDetector.delete(Database);
    //     CircularDetector.delete(MyService);
    // });

    // const compiler = new CompilerContext();
    // const fn = compiler.build(`
    //     if (arg === 1) return 2;
    //     if (arg === 2) return 3;
    //     if (arg === 3) return 4;
    // `, 'arg');
    //
    // bench.add('simple, compiled', () => {
    //     fn(2);
    // });

    // bench.add('new Injector', () => {
    //     new Injector();
    // });
    //
    // bench.add('new Injector w parents', () => {
    //     new Injector([], [root]);
    // });
    //
    // bench.add('fork', () => {
    //     root.fork();
    // });
    //
    // const context = InjectorContext.forProviders([Database, MyService, {provide: Database2, scope: 'http'}]);
    // const context2 = context.createChildScope('http');
    // context2.getInjector(0);
    //
    // bench.add('context.createChildScope', () => {
    //     const context2 = context.createChildScope('http');
    // });
    //
    // bench.add('context.createChildScope + getInjector', () => {
    //     const context2 = context.createChildScope('http');
    //     context2.getInjector(0);
    // });

    bench.add('new Database', () => {
        new Database();
    });

    bench.add('root db', () => {
        root.get(Database);
    });

    // bench.add('root db2', () => {
    //     root.get(Database2);
    // });

    bench.add('root myService', () => {
        root.get(MyService);
    });

    bench.add('root myService in fork', () => {
        root.fork().get(MyService);
    });

    bench.add('child db', () => {
        child.get(Database);
    });

    bench.add('child myService', () => {
        child.get(MyService);
    });

    bench.run();
}