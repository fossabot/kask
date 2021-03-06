import {Component, OnDestroy, OnInit} from '@angular/core';
import {ActivatedRoute} from '@angular/router';
import {BeerService} from '../../../services/beer.service';
import {Brewery} from '../../../models/brewery.model';

@Component({
    selector: 'brewery-info',
    templateUrl: './template.html',
    styleUrls: ['../../styles.scss', '../styles.scss', './styles.scss']
})
export class BreweryInfoComponent implements OnInit, OnDestroy {
    private subscriptions = [];
    brewery: Brewery;

    constructor(
        private _route: ActivatedRoute,
        private _beerService: BeerService
    ) { }

    ngOnInit() {
        let id: number = this._route.snapshot.params['id'];
        this._beerService.getBrewery(id).subscribe(breweryData => {
            this.brewery = <Brewery>breweryData;
        });
    }

    ngOnDestroy() {
        this.subscriptions.forEach(sub => sub.unsubscribe());
        this.subscriptions = [];
    }
}
