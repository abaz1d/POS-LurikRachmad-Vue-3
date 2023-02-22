CREATE OR REPLACE FUNCTION update_returjual() RETURNS TRIGGER AS $set_returjual$
    DECLARE
    outlet VARCHAR;
    qty_lama INTEGER;
    sum_total NUMERIC;
    BEGIN
        IF (TG_OP = 'INSERT') THEN
            --update stok
            SELECT id_outlet INTO outlet FROM retur_penjualan WHERE id_retur = NEW.id_retur;
            SELECT stok_varian INTO qty_lama FROM sub_varian WHERE id_varian = NEW.id_varian AND id_outlet = outlet;
            UPDATE sub_varian SET stok_varian = qty_lama - NEW.qty WHERE id_varian = NEW.id_varian AND id_outlet = outlet;

        ELSIF (TG_OP = 'UPDATE') THEN
            --update stok
            SELECT id_outlet INTO outlet FROM retur_penjualan WHERE id_retur = NEW.id_retur;
            SELECT stok_varian INTO qty_lama FROM sub_varian WHERE id_varian = NEW.id_varian AND id_outlet = outlet;
            UPDATE sub_varian SET stok_varian = qty_lama + OLD.qty - NEW.qty WHERE id_varian = NEW.id_varian AND id_outlet = outlet;
            
        ELSIF (TG_OP = 'DELETE') THEN
            --update stok
            SELECT id_outlet INTO outlet FROM retur_penjualan WHERE id_retur = OLD.id_retur;
            SELECT stok_varian INTO qty_lama FROM sub_varian WHERE id_varian = OLD.id_varian AND id_outlet = outlet;
            UPDATE sub_varian SET stok_varian = qty_lama + OLD.qty WHERE id_varian = OLD.id_varian AND id_outlet = outlet;

        END IF;
        -- update retur_penjualan
        SELECT sum(qty) INTO sum_total FROM retur_penjualan_detail WHERE id_retur = NEW.id_retur;
        UPDATE retur_penjualan SET total_barang = sum_total WHERE id_retur = NEW.id_retur;

        RETURN NULL; -- result is ignored since this is an AFTER trigger
    END;
$set_returjual$ LANGUAGE plpgsql;

CREATE OR REPLACE TRIGGER set_returjual
AFTER INSERT OR UPDATE OR DELETE ON retur_penjualan_detail
    FOR EACH ROW EXECUTE FUNCTION update_returjual();