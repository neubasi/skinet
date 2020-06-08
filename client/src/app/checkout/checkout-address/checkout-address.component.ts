import { Component, OnInit, Input } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { AccountService } from 'src/app/account/account.service';
import { ToastService } from 'src/app/core/toast/toast.service';

@Component({
  selector: 'app-checkout-address',
  templateUrl: './checkout-address.component.html',
  styleUrls: ['./checkout-address.component.scss']
})
export class CheckoutAddressComponent implements OnInit {

  @Input() checkoutForm: FormGroup;

  constructor(private accountService: AccountService, private toastService: ToastService) { }

  ngOnInit(): void {
  }

  saveUserAddress() {
    this.accountService.updateUserAddress(this.checkoutForm.get('addressForm').value)
    .subscribe(() => {
      this.toastService.show('SUCCESS - Address saved',
      { classname: 'bg-success text-light', delay: 3000 });
    },
    error => {
      console.log(error);
    });
  }

}
