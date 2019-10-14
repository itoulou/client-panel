import { Component, OnInit } from '@angular/core';
import { ClientService } from 'src/app/services/client.service';
import { Router, ActivatedRoute } from '@angular/router';
import { FlashMessagesService } from 'angular2-flash-messages';
import { Client } from 'src/app/models/Client';

@Component({
  selector: 'app-client-details',
  templateUrl: './client-details.component.html',
  styleUrls: ['./client-details.component.css']
})
export class ClientDetailsComponent implements OnInit {

  id: string;
  client: Client;
  hasBalance: boolean = false;
  showBalanceUpdateInput: boolean = false;

  constructor(
    private clientService: ClientService,
    private router: Router,
    private route: ActivatedRoute,
    private flashMessage: FlashMessagesService
  ) { }

  ngOnInit() {
    // Get id from URL
    this.id = this.route.snapshot.params['id'];
    console.log(this.id);

    // Get client
    this.clientService.getClient(this.id).subscribe(client => {
      if (client != null) {
        if (client.balance > 0) {
          this.hasBalance = true;
        }
      }

      this.client = client;
      console.log(this.client);
    });

    
  }

  updateBalance() {
    this.clientService.updateClient(this.client);
    this.flashMessage.show("Balance updated", {
      cssClass: 'alert-success', timeout: 4000
    });
    
  };

  onDeleteClick() {
    if (confirm('Are you sure?')) {
      this.clientService.deleteClient(this.client);
      this.flashMessage.show("Client deleted", {
        cssClass: 'alert-success', timeout: 4000
      });
      this.router.navigate(["/"]);
    }
  }

}
